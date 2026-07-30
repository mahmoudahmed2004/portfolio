"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  selectSceneQuality,
  type SceneQuality,
  type SceneSignals,
} from "@/lib/scene-quality";

type NetworkConnection = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithCapabilities = Navigator & {
  connection?: NetworkConnection;
  deviceMemory?: number;
};

export type SceneQualityState = {
  quality: SceneQuality;
  markContextLost: () => void;
};

function detectWebGL(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");

  try {
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function subscribeToMediaQuery(
  query: MediaQueryList,
  listener: () => void,
): () => void {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

export function useSceneQuality(): SceneQualityState {
  const [quality, setQuality] = useState<SceneQuality>("static");
  const contextLost = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const mobile = window.matchMedia("(max-width: 767px)");
    const browserNavigator =
      window.navigator as NavigatorWithCapabilities;
    const { connection } = browserNavigator;
    const webgl = detectWebGL();

    const updateQuality = () => {
      const signals: SceneSignals = {
        webgl,
        reducedMotion: reducedMotion.matches,
        saveData: connection?.saveData === true,
        deviceMemory: browserNavigator.deviceMemory,
        mobile: mobile.matches,
        contextLost: contextLost.current,
      };

      setQuality(selectSceneQuality(signals));
    };

    updateQuality();

    const unsubscribeReducedMotion = subscribeToMediaQuery(
      reducedMotion,
      updateQuality,
    );
    const unsubscribeMobile = subscribeToMediaQuery(mobile, updateQuality);
    connection?.addEventListener("change", updateQuality);

    return () => {
      unsubscribeReducedMotion();
      unsubscribeMobile();
      connection?.removeEventListener("change", updateQuality);
    };
  }, []);

  const markContextLost = useCallback(() => {
    contextLost.current = true;
    setQuality("static");
  }, []);

  return { quality, markContextLost };
}
