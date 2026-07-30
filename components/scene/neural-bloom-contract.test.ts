import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getSignalPointCount,
  phaseTargets,
} from "@/components/scene/neural-bloom-model";

const modelSource = readFileSync(
  resolve("components/scene/neural-bloom-model.tsx"),
  "utf8",
);
const sceneSource = readFileSync(
  resolve("components/scene/neural-bloom-scene.tsx"),
  "utf8",
);
const loaderSource = readFileSync(
  resolve("components/scene/neural-bloom-loader.tsx"),
  "utf8",
);

describe("Neural Bloom model contract", () => {
  it("uses the approved phase targets", () => {
    expect(phaseTargets).toEqual({
      seed: { openness: 0.18, scale: 0.82, rotationY: 0.1 },
      expertise: { openness: 0.58, scale: 1, rotationY: 0.55 },
      work: { openness: 1, scale: 1.08, rotationY: 1.05 },
      timeline: { openness: 0.42, scale: 0.86, rotationY: 1.55 },
      contact: { openness: 0.68, scale: 0.78, rotationY: 2.05 },
    });
  });

  it("caps signal points at the quality budgets", () => {
    expect(getSignalPointCount("high")).toBe(36);
    expect(getSignalPointCount("low")).toBe(12);
  });

  it("reuses one physical petal material and one petal geometry", () => {
    expect(modelSource.match(/new MeshPhysicalMaterial/g)).toHaveLength(1);
    expect(modelSource.match(/new SphereGeometry/g)).toHaveLength(1);
    expect(modelSource).toMatch(
      /Array\.from\(\s*\{\s*length:\s*6\s*\}/,
    );
    expect(modelSource).toMatch(/petalGeometry/);
    expect(modelSource).toMatch(/petalMaterial/);
  });

  it("damps scroll and phase-driven transforms without interaction handlers", () => {
    expect(modelSource).toMatch(/useFrame/);
    expect(modelSource).toMatch(/scrollYProgress\.get\(\)/);
    expect(modelSource).toMatch(/MathUtils\.damp/);
    expect(modelSource).not.toMatch(/onPointer|onClick|onWheel|onDrag/);
  });
});

describe("Neural Bloom scene contract", () => {
  it("uses the exact DPR and bounded light rig", () => {
    expect(sceneSource).toMatch(
      /dpr=\{quality === "high" \? \[1, 1\.5\] : 1\}/,
    );
    expect(sceneSource.match(/<ambientLight/g)).toHaveLength(1);
    expect(
      sceneSource.match(/<(?:directional|point|spot)Light/g) ?? [],
    ).toHaveLength(3);
  });

  it("pauses offscreen and permanently falls back on context loss", () => {
    expect(sceneSource).toMatch(
      /frameloop=\{visible \? "always" : "demand"\}/,
    );
    expect(sceneSource).toMatch(/IntersectionObserver/);
    expect(sceneSource).toMatch(/webglcontextlost/);
    expect(sceneSource).toMatch(/markContextLost/);
  });

  it("stays procedural and transparent without heavyweight subsystems", () => {
    expect(sceneSource).toMatch(/alpha:\s*true/);
    expect(sceneSource).not.toMatch(
      /castShadow|receiveShadow|postprocessing|Environment|useGLTF|useLoader|Physics|\.glb|\.gltf|\.hdr/,
    );
  });
});

describe("Neural Bloom loader contract", () => {
  it("loads the named scene export client-side and keeps one fallback box", () => {
    expect(loaderSource).toMatch(/dynamic\(/);
    expect(loaderSource).toMatch(
      /import\("@\/components\/scene\/neural-bloom-scene"\)/,
    );
    expect(loaderSource).toMatch(
      /\(\{ NeuralBloomScene \}\) => NeuralBloomScene/,
    );
    expect(loaderSource).toMatch(/ssr:\s*false/);
    expect(loaderSource.match(/<NeuralBloom2D\s*\/>/g)).toHaveLength(1);
    expect(loaderSource).toMatch(/onCreated/);
  });
});
