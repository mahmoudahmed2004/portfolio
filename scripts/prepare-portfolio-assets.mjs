import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, ".tools", "source-assets");
const outputDir = path.join(root, "public", "images", "projects");
const slugs = [
  "genoscene-app",
  "oralvision",
  "corrective-rag",
  "realistic-face-dcgan",
  "pos-system",
  "genoscene-website",
];

await fs.mkdir(outputDir, { recursive: true });

for (const slug of slugs) {
  const candidates = ["png", "jpg", "jpeg"].map((extension) =>
    path.join(sourceDir, `${slug}.${extension}`),
  );
  const source = await candidates.reduce(async (matchPromise, candidate) => {
    const match = await matchPromise;
    if (match) return match;
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      return undefined;
    }
  }, Promise.resolve(undefined));

  if (!source) {
    throw new Error(`Missing source image for ${slug}`);
  }

  const pipeline = sharp(source).flatten({ background: "#090d1c" });

  await pipeline
    .clone()
    .resize(1600, 1000, {
      fit: "contain",
      background: "#090d1c",
      withoutEnlargement: false,
    })
    .avif({ quality: 64, effort: 6 })
    .toFile(path.join(outputDir, `${slug}-1600.avif`));

  await pipeline
    .clone()
    .resize(960, 600, {
      fit: "contain",
      background: "#090d1c",
      withoutEnlargement: false,
    })
    .webp({ quality: 76, effort: 6 })
    .toFile(path.join(outputDir, `${slug}-960.webp`));
}
