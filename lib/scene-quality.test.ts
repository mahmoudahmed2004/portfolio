import { describe, expect, it } from "vitest";
import { selectSceneQuality } from "@/lib/scene-quality";

const capable = {
  webgl: true,
  reducedMotion: false,
  saveData: false,
  deviceMemory: 8,
  mobile: false,
  contextLost: false,
};

describe("selectSceneQuality", () => {
  it.each([
    ["no WebGL", { ...capable, webgl: false }],
    ["reduced motion", { ...capable, reducedMotion: true }],
    ["data saver", { ...capable, saveData: true }],
    ["context loss", { ...capable, contextLost: true }],
  ])("returns static for %s", (_label, signals) => {
    expect(selectSceneQuality(signals)).toBe("static");
  });

  it("returns low for mobile and low-memory devices", () => {
    expect(selectSceneQuality({ ...capable, mobile: true })).toBe("low");
    expect(selectSceneQuality({ ...capable, deviceMemory: 4 })).toBe("low");
  });

  it("returns high for a capable desktop", () => {
    expect(selectSceneQuality(capable)).toBe("high");
  });
});
