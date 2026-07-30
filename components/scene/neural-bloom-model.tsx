"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
  type Group,
} from "three";
import type { ObservatoryPhase } from "@/components/motion/observatory-provider";
import type { SceneQuality } from "@/lib/scene-quality";

type NeuralBloomModelProps = {
  quality: SceneQuality;
  scrollYProgress: MotionValue<number>;
  activePhase: ObservatoryPhase;
};

type BloomMotion = {
  openness: number;
  rotationY: number;
  scale: number;
  vertical: number;
};

export const phaseTargets = {
  seed: { openness: 0.18, scale: 0.82, rotationY: 0.1 },
  expertise: { openness: 0.58, scale: 1, rotationY: 0.55 },
  work: { openness: 1, scale: 1.08, rotationY: 1.05 },
  timeline: { openness: 0.42, scale: 0.86, rotationY: 1.55 },
  contact: { openness: 0.68, scale: 0.78, rotationY: 2.05 },
} as const;

const petalAngles = Array.from(
  { length: 6 },
  (_, index) => (index / 6) * Math.PI * 2,
);

export function getSignalPointCount(quality: SceneQuality): number {
  if (quality === "high") {
    return 36;
  }

  return quality === "low" ? 12 : 0;
}

function createSignalGeometry(quality: SceneQuality): BufferGeometry {
  const count = getSignalPointCount(quality);
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const progress = index / Math.max(count, 1);
    const angle = progress * Math.PI * 10;
    const radius = 1.42 + 0.3 * Math.sin(index * 2.17);
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = Math.sin(angle) * radius;
    positions[index * 3 + 2] = (progress - 0.5) * 1.35;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  return geometry;
}

export function NeuralBloomModel({
  quality,
  scrollYProgress,
  activePhase,
}: NeuralBloomModelProps) {
  const bloomRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const signalRef = useRef<Points>(null);
  const petalRefs = useRef<Array<Mesh | null>>([]);
  const motion = useRef<BloomMotion>({
    openness: phaseTargets.seed.openness,
    rotationY: phaseTargets.seed.rotationY,
    scale: phaseTargets.seed.scale,
    vertical: 0,
  });

  const petalGeometry = useMemo(() => {
    const geometry = new SphereGeometry(
      1,
      quality === "high" ? 28 : 18,
      quality === "high" ? 18 : 12,
    );
    geometry.scale(0.5, 1.28, 0.3);
    geometry.translate(0, 1.08, 0);
    return geometry;
  }, [quality]);

  const petalMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#748bff"),
        emissive: new Color("#152674"),
        emissiveIntensity: 0.24,
        transmission: quality === "high" ? 0.72 : 0.5,
        roughness: quality === "high" ? 0.2 : 0.3,
        thickness: 0.8,
        ior: 1.38,
        clearcoat: 0.35,
        clearcoatRoughness: 0.26,
        metalness: 0.04,
        transparent: true,
        opacity: 0.9,
      }),
    [quality],
  );

  const coreGeometry = useMemo(
    () => new IcosahedronGeometry(0.32, quality === "high" ? 2 : 1),
    [quality],
  );
  const coreMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#d8fbff"),
        emissive: new Color("#78efff"),
        emissiveIntensity: 2.6,
        roughness: 0.28,
      }),
    [],
  );
  const signalGeometry = useMemo(
    () => createSignalGeometry(quality),
    [quality],
  );
  const signalMaterial = useMemo(
    () =>
      new PointsMaterial({
        color: new Color("#bfc8ff"),
        size: quality === "high" ? 0.042 : 0.052,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      }),
    [quality],
  );

  useEffect(
    () => () => {
      petalGeometry.dispose();
      petalMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      signalGeometry.dispose();
      signalMaterial.dispose();
    },
    [
      coreGeometry,
      coreMaterial,
      petalGeometry,
      petalMaterial,
      signalGeometry,
      signalMaterial,
    ],
  );

  useFrame((_, delta) => {
    const bloom = bloomRef.current;
    const core = coreRef.current;
    const signal = signalRef.current;
    if (!bloom || !core || !signal) {
      return;
    }

    const progress = MathUtils.clamp(scrollYProgress.get(), 0, 1);
    const phase = phaseTargets[activePhase];
    const targetOpenness = MathUtils.clamp(
      phase.openness + (progress - 0.5) * 0.08,
      0.12,
      1,
    );
    const targetScale = phase.scale * (0.97 + progress * 0.05);
    const targetRotationY = phase.rotationY + progress * Math.PI * 0.24;
    const targetVertical = (progress - 0.5) * 0.42;

    motion.current.openness = MathUtils.damp(
      motion.current.openness,
      targetOpenness,
      4.4,
      delta,
    );
    motion.current.scale = MathUtils.damp(
      motion.current.scale,
      targetScale,
      3.8,
      delta,
    );
    motion.current.rotationY = MathUtils.damp(
      motion.current.rotationY,
      targetRotationY,
      3.2,
      delta,
    );
    motion.current.vertical = MathUtils.damp(
      motion.current.vertical,
      targetVertical,
      3.8,
      delta,
    );

    const { openness, rotationY, scale, vertical } = motion.current;
    bloom.rotation.y = rotationY;
    bloom.rotation.x = -0.18 + progress * 0.28;
    bloom.position.y = vertical;
    bloom.scale.setScalar(scale);

    for (const [index, angle] of petalAngles.entries()) {
      const petal = petalRefs.current[index];
      if (!petal) {
        continue;
      }

      const distance = 0.08 + openness * 0.34;
      petal.position.set(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
        Math.sin(angle * 2) * openness * 0.12,
      );
      petal.rotation.set(
        (openness - 0.5) * 0.42,
        Math.sin(angle) * openness * 0.18,
        angle - Math.PI / 2,
      );
    }

    core.rotation.x += delta * 0.3;
    core.rotation.y -= delta * 0.42;
    core.scale.setScalar(0.9 + openness * 0.24);
    signal.rotation.z -= delta * (0.035 + progress * 0.025);
    signal.rotation.y += delta * 0.025;
  });

  return (
    <group ref={bloomRef} dispose={null}>
      {petalAngles.map((angle, index) => (
        <mesh
          key={angle}
          ref={(mesh) => {
            petalRefs.current[index] = mesh;
          }}
          geometry={petalGeometry}
          material={petalMaterial}
        />
      ))}
      <mesh
        ref={coreRef}
        geometry={coreGeometry}
        material={coreMaterial}
      />
      <points
        ref={signalRef}
        geometry={signalGeometry}
        material={signalMaterial}
      />
    </group>
  );
}
