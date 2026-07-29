"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, type RootState } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import type { ObservatoryPhase } from "@/components/motion/observatory-provider";
import { NeuralBloomModel } from "@/components/scene/neural-bloom-model";
import type { SceneQuality } from "@/lib/scene-quality";

export type NeuralBloomSceneProps = {
  quality: SceneQuality;
  scrollYProgress: MotionValue<number>;
  activePhase: ObservatoryPhase;
  markContextLost: () => void;
  onCreated: () => void;
};

export function NeuralBloomScene({
  quality,
  scrollYProgress,
  activePhase,
  markContextLost,
  onCreated,
}: NeuralBloomSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry?.isIntersecting === true);
      },
      { threshold: 0.01 },
    );
    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  const handleContextLost = useCallback(
    (event: Event) => {
      event.preventDefault();
      markContextLost();
    },
    [markContextLost],
  );

  const handleCreated = useCallback(
    ({ gl }: RootState) => {
      gl.setClearColor(0x000000, 0);
      canvasRef.current = gl.domElement;
      gl.domElement.addEventListener(
        "webglcontextlost",
        handleContextLost,
      );
      onCreated();
    },
    [handleContextLost, onCreated],
  );

  useEffect(
    () => () => {
      canvasRef.current?.removeEventListener(
        "webglcontextlost",
        handleContextLost,
      );
    },
    [handleContextLost],
  );

  return (
    <div ref={hostRef} className="neural-bloom-scene">
      <Canvas
        dpr={quality === "high" ? [1, 1.5] : 1}
        frameloop={visible ? "always" : "demand"}
        camera={{ position: [0, 0, 5.6], fov: 42, near: 0.1, far: 20 }}
        gl={{
          alpha: true,
          antialias: quality === "high",
          powerPreference: quality === "high" ? "high-performance" : "default",
        }}
        onCreated={handleCreated}
      >
        <ambientLight intensity={0.46} color="#d7c7ff" />
        <pointLight
          position={[3.1, 2.5, 4]}
          intensity={quality === "high" ? 14 : 10}
          color="#78efff"
          distance={9}
        />
        <pointLight
          position={[-3, -1.2, 3]}
          intensity={quality === "high" ? 12 : 8}
          color="#7b72ff"
          distance={8}
        />
        <pointLight
          position={[0, 3.6, -1.5]}
          intensity={quality === "high" ? 9 : 6}
          color="#d7c7ff"
          distance={8}
        />
        <NeuralBloomModel
          quality={quality}
          scrollYProgress={scrollYProgress}
          activePhase={activePhase}
        />
      </Canvas>
    </div>
  );
}
