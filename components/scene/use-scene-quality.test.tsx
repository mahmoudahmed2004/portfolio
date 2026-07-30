import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSceneQuality } from "@/components/scene/use-scene-quality";

type ChangeListener = (event: MediaQueryListEvent) => void;

function createMediaQueryList(media: string, initialMatches = false) {
  const listeners = new Set<ChangeListener>();
  const addEventListener = vi.fn(
    (_type: "change", listener: ChangeListener) => listeners.add(listener),
  );
  const removeEventListener = vi.fn(
    (_type: "change", listener: ChangeListener) => listeners.delete(listener),
  );

  return {
    media,
    matches: initialMatches,
    onchange: null,
    addEventListener,
    removeEventListener,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    dispatch(matches: boolean) {
      this.matches = matches;
      for (const listener of listeners) {
        listener({ matches, media } as MediaQueryListEvent);
      }
    },
  };
}

function createConnection() {
  const listeners = new Set<EventListener>();

  return {
    saveData: false,
    addEventListener: vi.fn(
      (_type: "change", listener: EventListener) => listeners.add(listener),
    ),
    removeEventListener: vi.fn(
      (_type: "change", listener: EventListener) => listeners.delete(listener),
    ),
    dispatch() {
      for (const listener of listeners) {
        listener(new Event("change"));
      }
    },
  };
}

describe("useSceneQuality", () => {
  const originalConnection = Object.getOwnPropertyDescriptor(
    Navigator.prototype,
    "connection",
  );
  const originalDeviceMemory = Object.getOwnPropertyDescriptor(
    Navigator.prototype,
    "deviceMemory",
  );

  let reducedMotion: ReturnType<typeof createMediaQueryList>;
  let mobile: ReturnType<typeof createMediaQueryList>;
  let connection: ReturnType<typeof createConnection>;
  let canvasWasConnected: boolean[];

  beforeEach(() => {
    reducedMotion = createMediaQueryList(
      "(prefers-reduced-motion: reduce)",
      false,
    );
    mobile = createMediaQueryList("(max-width: 767px)", false);
    connection = createConnection();
    canvasWasConnected = [];

    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) =>
        query === reducedMotion.media ? reducedMotion : mobile,
      ),
    );
    Object.defineProperty(Navigator.prototype, "connection", {
      configurable: true,
      get: () => connection,
    });
    Object.defineProperty(Navigator.prototype, "deviceMemory", {
      configurable: true,
      get: () => 8,
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      function (this: HTMLCanvasElement, contextId: string) {
        canvasWasConnected.push(this.isConnected);
        return contextId === "webgl2"
          ? ({} as WebGL2RenderingContext)
          : null;
      } as HTMLCanvasElement["getContext"],
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    if (originalConnection) {
      Object.defineProperty(
        Navigator.prototype,
        "connection",
        originalConnection,
      );
    } else {
      delete (Navigator.prototype as Navigator & { connection?: unknown })
        .connection;
    }

    if (originalDeviceMemory) {
      Object.defineProperty(
        Navigator.prototype,
        "deviceMemory",
        originalDeviceMemory,
      );
    } else {
      delete (Navigator.prototype as Navigator & { deviceMemory?: number })
        .deviceMemory;
    }
  });

  it("keeps the server render static before browser effects run", () => {
    function Probe() {
      const { quality } = useSceneQuality();
      return <output>{quality}</output>;
    }

    expect(renderToString(<Probe />)).toContain(">static<");
    expect(HTMLCanvasElement.prototype.getContext).not.toHaveBeenCalled();
  });

  it("uses a disposable WebGL canvas and reacts to capability changes", async () => {
    const { result, unmount } = renderHook(() => useSceneQuality());

    await waitFor(() => expect(result.current.quality).toBe("high"));
    expect(canvasWasConnected).toEqual([false]);
    expect(document.querySelector("canvas")).toBeNull();

    act(() => mobile.dispatch(true));
    expect(result.current.quality).toBe("low");

    act(() => {
      connection.saveData = true;
      connection.dispatch();
    });
    expect(result.current.quality).toBe("static");

    unmount();
    expect(reducedMotion.removeEventListener).toHaveBeenCalledTimes(1);
    expect(mobile.removeEventListener).toHaveBeenCalledTimes(1);
    expect(connection.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("keeps context loss as a permanent static fallback", async () => {
    const { result } = renderHook(() => useSceneQuality());

    await waitFor(() => expect(result.current.quality).toBe("high"));
    act(() => result.current.markContextLost());
    expect(result.current.quality).toBe("static");

    act(() => {
      mobile.dispatch(true);
      mobile.dispatch(false);
      reducedMotion.dispatch(true);
      reducedMotion.dispatch(false);
    });
    expect(result.current.quality).toBe("static");
  });
});
