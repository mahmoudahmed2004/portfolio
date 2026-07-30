export type SceneQuality = "static" | "low" | "high";

export type SceneSignals = {
  webgl: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  deviceMemory?: number;
  mobile: boolean;
  contextLost: boolean;
};

export function selectSceneQuality(signals: SceneSignals): SceneQuality {
  if (
    !signals.webgl ||
    signals.reducedMotion ||
    signals.saveData ||
    signals.contextLost
  ) {
    return "static";
  }

  if (
    signals.mobile ||
    (typeof signals.deviceMemory === "number" &&
      signals.deviceMemory <= 4)
  ) {
    return "low";
  }

  return "high";
}
