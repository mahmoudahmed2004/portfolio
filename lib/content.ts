import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type ProfileLink = {
  label: string;
  href: string;
  kind?: "email" | "phone" | "social" | "download" | "external";
};

export type Profile = {
  name: string;
  headline: string;
  titlePrefix: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  profileImage: string;
  links: ProfileLink[];
  stats: { label: string; value: string }[];
  focus: string[];
  softSkills: string[];
  languages: { name: string; level: string }[];
  specialties: { label: string; detail: string }[];
  education: {
    school: string;
    degree: string;
    location: string;
    start: string;
    end: string;
  };
};

export type Project = {
  title: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
  links?: ProfileLink[];
  featured?: boolean;
  image?: string;
  draft?: boolean;
  order?: number;
};

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
  draft?: boolean;
  order?: number;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  type: "Work" | "Training" | "Student Activity";
  highlights: string[];
  draft?: boolean;
  order?: number;
};

export type MdxDocument<T> = {
  slug: string;
  body: string;
  metadata: T;
};

function readMdxFile<T>(filePath: string): MdxDocument<T> {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  return {
    slug: path.basename(filePath, path.extname(filePath)),
    body: parsed.content.trim(),
    metadata: parsed.data as T,
  };
}

function readCollection<T extends { order?: number; draft?: boolean }>(
  folder: string,
  options: { includeDrafts?: boolean } = {},
): MdxDocument<T>[] {
  const dir = path.join(contentRoot, folder);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readMdxFile<T>(path.join(dir, file)))
    .filter((item) => options.includeDrafts || !item.metadata.draft)
    .sort((a, b) => {
      const orderA = a.metadata.order ?? 999;
      const orderB = b.metadata.order ?? 999;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.slug.localeCompare(b.slug);
    });
}

export function getProfile() {
  return readMdxFile<Profile>(path.join(contentRoot, "profile.mdx"));
}

export function getProjects() {
  return readCollection<Project>("projects");
}

export function getCertificates() {
  return readCollection<Certificate>("certificates");
}

export function getExperience() {
  return readCollection<Experience>("experience");
}
