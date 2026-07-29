"use client";

import { NeuralBloom2D } from "@/components/scene/neural-bloom-2d";
import { useSceneQuality } from "@/components/scene/use-scene-quality";

export function NeuralBloomLoader() {
  const { quality } = useSceneQuality();

  return (
    <div className="neural-bloom-loader" data-scene-quality={quality}>
      <NeuralBloom2D />
    </div>
  );
}
