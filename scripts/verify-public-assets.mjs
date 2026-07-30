import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const slugs = [
  "genoscene-app",
  "oralvision",
  "corrective-rag",
  "realistic-face-dcgan",
  "pos-system",
  "genoscene-website",
];

for (const slug of slugs) {
  const avif = path.join(
    root,
    "public",
    "images",
    "projects",
    `${slug}-1600.avif`,
  );
  const webp = path.join(
    root,
    "public",
    "images",
    "projects",
    `${slug}-960.webp`,
  );
  const avifMetadata = await sharp(avif).metadata();
  const webpMetadata = await sharp(webp).metadata();

  if (avifMetadata.width !== 1600 || avifMetadata.height !== 1000) {
    throw new Error(`${slug} AVIF dimensions are invalid`);
  }
  if (webpMetadata.width !== 960 || webpMetadata.height !== 600) {
    throw new Error(`${slug} WebP dimensions are invalid`);
  }
  if ((await fs.stat(avif)).size > 500_000) {
    throw new Error(`${slug} AVIF exceeds 500 KB`);
  }
  if ((await fs.stat(webp)).size > 500_000) {
    throw new Error(`${slug} WebP exceeds 500 KB`);
  }
}

for (const certificate of [
  "instant-ai-diploma.webp",
  "digitopia-2025.webp",
  "build-with-ai-masr.webp",
]) {
  const certificatePath = path.join(
    root,
    "public",
    "images",
    "certificates",
    certificate,
  );
  const metadata = await sharp(certificatePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`${certificate} has invalid dimensions`);
  }
  if ((await fs.stat(certificatePath)).size > 500_000) {
    throw new Error(`${certificate} exceeds 500 KB`);
  }
}

for (const document of [
  "mahmoud-ahmed-farouk-cv.pdf",
  "mahmoud-ahmed-farouk-cv.docx",
]) {
  await fs.access(path.join(root, "public", "docs", document));
}

const publicFiles = await fs.readdir(path.join(root, "public", "docs"));
if (publicFiles.includes("mahmoud-farok-resume.docx")) {
  throw new Error("Old public CV must be removed");
}

process.stdout.write("Public assets verified.\n");
