"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useObservatory } from "@/components/motion/observatory-provider";
import { NeuralBloom2D } from "@/components/scene/neural-bloom-2d";
import { useSceneQuality } from "@/components/scene/use-scene-quality";
import type { NeuralBloomSceneProps } from "@/components/scene/neural-bloom-scene";

const NeuralBloomScene = dynamic(
  () =>
    import("@/components/scene/neural-bloom-scene").then(
      ({ NeuralBloomScene }) => NeuralBloomScene,
    ),
  { ssr: false },
);

type NeuralBloomSceneLayerProps = Omit<
  NeuralBloomSceneProps,
  "onCreated"
>;

function NeuralBloomSceneLayer(props: NeuralBloomSceneLayerProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const handleCreated = useCallback(() => {
    setSceneReady(true);
  }, []);

  return (
    <div
      className="neural-bloom-scene-layer"
      data-scene-ready={sceneReady}
    >
      <NeuralBloomScene {...props} onCreated={handleCreated} />
    </div>
  );
}

export function NeuralBloomLoader() {
  const { activePhase, scrollYProgress } = useObservatory();
  const { quality, markContextLost } = useSceneQuality();

  return (
    <div
      className="neural-bloom-loader"
      data-scene-quality={quality}
    >
      <NeuralBloom2D />
      {quality !== "static" ? (
        <NeuralBloomSceneLayer
          quality={quality}
          scrollYProgress={scrollYProgress}
          activePhase={activePhase}
          markContextLost={markContextLost}
        />
      ) : null}
    </div>
  );
}
