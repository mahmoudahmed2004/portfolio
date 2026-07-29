"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useObservatory } from "@/components/motion/observatory-provider";
import { NeuralBloom2D } from "@/components/scene/neural-bloom-2d";
import { useSceneQuality } from "@/components/scene/use-scene-quality";

const NeuralBloomScene = dynamic(
  () =>
    import("@/components/scene/neural-bloom-scene").then(
      ({ NeuralBloomScene }) => NeuralBloomScene,
    ),
  { ssr: false },
);

export function NeuralBloomLoader() {
  const { activePhase, scrollYProgress } = useObservatory();
  const { quality, markContextLost } = useSceneQuality();
  const [readyQuality, setReadyQuality] = useState<
    typeof quality | null
  >(null);
  const sceneReady = quality !== "static" && readyQuality === quality;

  const handleCreated = useCallback(() => {
    setReadyQuality(quality);
  }, [quality]);

  return (
    <div
      className="neural-bloom-loader"
      data-scene-quality={quality}
      data-scene-ready={sceneReady}
    >
      <NeuralBloom2D />
      {quality !== "static" ? (
        <div
          className="neural-bloom-scene-layer"
          data-scene-ready={sceneReady}
        >
          <NeuralBloomScene
            quality={quality}
            scrollYProgress={scrollYProgress}
            activePhase={activePhase}
            markContextLost={markContextLost}
            onCreated={handleCreated}
          />
        </div>
      ) : null}
    </div>
  );
}
