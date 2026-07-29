# Neural Observatory Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing portfolio with a production-ready, English-only Neural Observatory experience that positions Mahmoud Ahmed Farouk as an AI Engineer, presents six verified projects, includes three certificates and an updated public CV, and progressively enhances a semantic page with the Neural Bloom 3D narrative.

**Architecture:** Next.js Server Components render all identity, project, experience, certificate, and SEO content. Small Client Components own navigation, galleries, scroll state, capability detection, and a dynamically imported React Three Fiber scene. A typed content module is the single source of truth, while the 3D canvas remains optional and always sits behind an equivalent 2D Neural Bloom.

**Tech Stack:** Next.js 16.2.6, React 19.2.6, TypeScript 6, Tailwind CSS 4, Motion 12.40, Three.js, React Three Fiber, Drei, Vitest, Testing Library, Playwright, axe-core, Sharp.

## Global Constraints

- Public display name is exactly `Mahmoud Ahmed Farouk`.
- Public headline is exactly `AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python`.
- Education is exactly `Computer Science Graduate — Modern Academy, Class of 2026`.
- Site language is English only.
- Software Development is a supporting capability, not the primary identity.
- Public contact options are Email, LinkedIn, and GitHub only; never display or embed a phone number.
- Use Next.js 16 App Router conventions after checking the matching guides in `node_modules/next/dist/docs/`.
- Keep all meaningful content in semantic HTML; WebGL is decorative progressive enhancement.
- Do not add GSAP unless Motion and native browser APIs fail a documented interaction requirement.
- Do not use stock imagery, generic space imagery, orbiting technology logos, or the watermarked GenoScene banner.
- GenoScene output is probabilistic research output, not definitive identification.
- OralVision is a research classifier, not clinical diagnosis.
- Generated faces and illustrative portraits must be labeled.
- Initial meaningful content must not wait for the Three.js bundle.
- The primary 3D scene must use procedural geometry and controlled local lighting.
- `prefers-reduced-motion`, unavailable WebGL, data saver, low device memory, and repeated WebGL context loss must receive a readable 2D experience.
- Desktop device pixel ratio is capped at 1.5; mobile/low quality is capped at 1.
- Production targets: LCP < 2.5 s, CLS < 0.1, INP < 200 ms on a representative mid-range mobile profile.
- Run lint, type-check, unit tests, browser tests, accessibility checks, and production build before deployment.

---

## File map

### Application and metadata

- Modify `app/layout.tsx` — fonts, metadata defaults, theme color, skip-link target.
- Replace `app/page.tsx` — assemble the semantic single-page portfolio.
- Replace `app/globals.css` — Neural Observatory tokens, layout, responsive and reduced-motion rules.
- Create `app/sitemap.ts` — canonical route listing.
- Create `app/robots.ts` — crawl policy and sitemap link.
- Create `app/cv/page.tsx` — printable, accessible HTML version of the public CV.
- Create `app/cv/print.css` — deterministic A4 print styling.

### Canonical data

- Create `lib/portfolio-data.ts` — shared types and the complete verified portfolio object.
- Create `lib/portfolio-data.test.ts` — identity, privacy, projects, certificates, metrics, and link validation.
- Delete `lib/content.ts` after all imports move to the typed source.
- Delete the obsolete `content/` tree after the typed source and tests pass.

### Shell and sections

- Create `components/shell/site-header.tsx` — responsive navigation and active-section state.
- Create `components/shell/site-footer.tsx` — final identity and external links.
- Create `components/shell/section-heading.tsx` — consistent section labels and titles.
- Create `components/sections/hero.tsx`.
- Create `components/sections/expertise-pipeline.tsx`.
- Create `components/sections/featured-work.tsx`.
- Create `components/sections/software-systems.tsx`.
- Create `components/sections/capability-constellation.tsx`.
- Create `components/sections/experience-timeline.tsx`.
- Create `components/sections/certificate-gallery.tsx`.
- Create `components/sections/about-cv.tsx`.
- Create `components/sections/contact.tsx`.
- Create `components/work/project-case-study.tsx`.
- Create `components/work/project-evidence.tsx`.
- Create `components/work/responsible-use-note.tsx`.

### Motion and scene

- Create `components/motion/observatory-provider.tsx` — one shared page progress and active-phase context.
- Create `components/motion/reveal.tsx` — restrained DOM reveal with reduced-motion behavior.
- Create `components/scene/neural-bloom-loader.tsx` — dynamic WebGL enhancement over a persistent fallback.
- Create `components/scene/neural-bloom-scene.tsx` — R3F canvas and scroll-driven bloom.
- Create `components/scene/neural-bloom-model.tsx` — procedural petals, core, lights, and progress transforms.
- Create `components/scene/neural-bloom-2d.tsx` — static semantic-hidden fallback.
- Create `components/scene/use-scene-quality.ts`.
- Create `lib/scene-quality.ts`.
- Create `lib/scene-quality.test.ts`.

### Tests and tooling

- Modify `package.json` and `package-lock.json`.
- Create `vitest.config.ts`.
- Create `vitest.setup.ts`.
- Create `playwright.config.ts`.
- Create `tests/site-header.test.tsx`.
- Create `tests/certificate-gallery.test.tsx`.
- Create `tests/portfolio.spec.ts`.
- Create `tests/accessibility.spec.ts`.
- Create `scripts/prepare-portfolio-assets.mjs`.
- Create `scripts/verify-public-assets.mjs`.

### Public assets

- Create `public/images/projects/<slug>-1600.avif` and `<slug>-960.webp` for six projects.
- Retain optimized certificate images under `public/images/certificates/`.
- Create `public/images/neural-bloom-fallback.svg`.
- Create `public/images/og/neural-observatory-1200x630.png` exactly once after the final hero is stable.
- Create `public/docs/mahmoud-ahmed-farouk-cv.pdf`.
- Create `public/docs/mahmoud-ahmed-farouk-cv.docx`.
- Remove `public/docs/mahmoud-farok-resume.docx` after verified replacements exist.

---

### Task 1: Install runtime and test foundations

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: existing Next.js 16 application and npm lockfile.
- Produces: `npm run test`, `npm run test:watch`, and `npm run test:e2e`; installed `three`, `@react-three/fiber`, `@react-three/drei`, `sharp`, Vitest, Testing Library, Playwright, and axe integration.

- [ ] **Step 1: Read the local Next.js guides before changing configuration**

Run:

```powershell
Get-Content node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.mdx
Get-Content node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/metadata/robots.mdx
Get-Content node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/metadata/sitemap.mdx
Get-Content node_modules/next/dist/docs/01-app/02-guides/lazy-loading.mdx
```

Expected: all four guides print successfully.

- [ ] **Step 2: Install the exact runtime and verification dependencies**

Run:

```powershell
npm install three@latest @react-three/fiber@latest @react-three/drei@latest
npm install --save-dev @types/three@latest sharp@latest vitest@latest jsdom@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest @vitejs/plugin-react@latest @playwright/test@latest @axe-core/playwright@latest
```

Expected: npm exits with code 0 and updates both package files.

- [ ] **Step 3: Add test scripts to `package.json`**

Set the scripts object to:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "assets:prepare": "node scripts/prepare-portfolio-assets.mjs",
  "assets:verify": "node scripts/verify-public-assets.mjs"
}
```

- [ ] **Step 4: Create the Vitest configuration**

Create `vitest.config.ts`:

```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Create the browser-test configuration**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
```

- [ ] **Step 6: Verify the unchanged application still builds**

Run:

```powershell
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit with code 0 before feature code begins.

- [ ] **Step 7: Commit the foundation**

```powershell
git add package.json package-lock.json vitest.config.ts vitest.setup.ts playwright.config.ts
git commit -m "test: add portfolio verification foundation"
```

---

### Task 2: Replace the old MDX profile with verified typed content

**Files:**
- Create: `lib/portfolio-data.ts`
- Create: `lib/portfolio-data.test.ts`
- Modify: `app/page.tsx`
- Delete: `lib/content.ts`
- Delete: `content/profile.mdx`
- Delete: `content/projects/*.mdx`
- Delete: `content/experience/*.mdx`
- Delete: `content/certificates/*.mdx`
- Delete: `content/_templates/*.mdx`

**Interfaces:**
- Consumes: facts approved in `docs/superpowers/specs/2026-07-29-ai-portfolio-design.md`.
- Produces: `portfolio: PortfolioData`, with `identity`, `navigation`, `capabilities`, `projects`, `experience`, and `certificates`.

- [ ] **Step 1: Write failing identity, privacy, and collection tests**

Create `lib/portfolio-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { portfolio } from "@/lib/portfolio-data";

const publicText = JSON.stringify(portfolio);

describe("portfolio data", () => {
  it("uses the approved public identity", () => {
    expect(portfolio.identity.name).toBe("Mahmoud Ahmed Farouk");
    expect(portfolio.identity.headline).toBe(
      "AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python",
    );
    expect(portfolio.identity.education).toBe(
      "Computer Science Graduate — Modern Academy, Class of 2026",
    );
  });

  it("contains no public phone number", () => {
    expect(publicText).not.toMatch(/01026889007|\(\s*\+20\)|tel:/i);
  });

  it("contains all six verified projects exactly once", () => {
    expect(portfolio.projects.map(({ slug }) => slug)).toEqual([
      "genoscene-app",
      "oralvision",
      "corrective-rag",
      "realistic-face-dcgan",
      "pos-system",
      "genoscene-website",
    ]);
  });

  it("contains the three verified certificates", () => {
    expect(portfolio.certificates).toHaveLength(3);
    expect(portfolio.certificates.map(({ slug }) => slug)).toEqual([
      "instant-ai-diploma",
      "digitopia-2025",
      "build-with-ai-masr",
    ]);
  });

  it("keeps safety language on sensitive AI work", () => {
    const genoScene = portfolio.projects.find(
      ({ slug }) => slug === "genoscene-app",
    );
    const oralVision = portfolio.projects.find(
      ({ slug }) => slug === "oralvision",
    );
    expect(genoScene?.responsibleUse).toMatch(/probabilistic|research/i);
    expect(genoScene?.teamContext).toMatch(/team graduation project/i);
    expect(oralVision?.responsibleUse).toMatch(/research|not.*diagnosis/i);
  });

  it("uses only valid public contact links", () => {
    expect(portfolio.identity.links).toEqual([
      {
        label: "GitHub",
        href: "https://github.com/mahmoudahmed2004",
        kind: "social",
      },
      {
        label: "LinkedIn",
        href:
          "https://www.linkedin.com/in/mahmoud-farouk-72737924a",
        kind: "social",
      },
      {
        label: "Email",
        href: "mailto:maf.bns@gmail.com",
        kind: "email",
      },
      {
        label: "Download CV",
        href: "/docs/mahmoud-ahmed-farouk-cv.pdf",
        kind: "download",
      },
    ]);
  });
});
```

- [ ] **Step 2: Run the tests and verify the missing module failure**

Run:

```powershell
npm run test -- lib/portfolio-data.test.ts
```

Expected: FAIL because `@/lib/portfolio-data` does not exist.

- [ ] **Step 3: Create the typed content contract**

Start `lib/portfolio-data.ts` with these exact exported interfaces:

```ts
export type PublicLink = {
  label: string;
  href: string;
  kind: "social" | "email" | "download" | "repository";
};

export type ProjectMetric = {
  label: string;
  value: string;
  context: string;
};

export type ProjectEvidence = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: "Featured AI" | "Software System";
  summary: string;
  problem: string;
  approach: string;
  contribution: string;
  outcome: string;
  stack: string[];
  metrics: ProjectMetric[];
  evidence: ProjectEvidence[];
  repository: PublicLink;
  teamContext?: string;
  responsibleUse?: string;
};

export type PortfolioCertificate = {
  slug: string;
  title: string;
  issuer: string;
  year: string;
  detail: string;
  image: string;
  original: string;
};

export type PortfolioExperience = {
  organization: string;
  role: string;
  period: string;
  type: "Experience" | "Training" | "Student activity" | "Education";
  summary: string;
};

export type PortfolioData = {
  identity: {
    name: string;
    role: string;
    headline: string;
    education: string;
    location: string;
    introduction: string;
    biography: string;
    links: PublicLink[];
  };
  navigation: { label: string; href: string }[];
  capabilities: {
    title: string;
    summary: string;
    skills: string[];
  }[];
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  certificates: PortfolioCertificate[];
};
```

- [ ] **Step 4: Add the complete verified content object**

In the same file, export `portfolio` using `satisfies PortfolioData`. Use these exact project identities and source URLs:

```ts
export const portfolio = {
  identity: {
    name: "Mahmoud Ahmed Farouk",
    role: "AI Engineer",
    headline:
      "AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python",
    education:
      "Computer Science Graduate — Modern Academy, Class of 2026",
    location: "Cairo, Egypt",
    introduction:
      "I build AI systems that move from data and evaluation to useful, human-facing software.",
    biography:
      "I am an AI Engineer focused on machine learning, deep learning, computer vision, retrieval systems, and automation. My software development experience helps me turn model work into interfaces, APIs, and complete products.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mahmoudahmed2004",
        kind: "social",
      },
      {
        label: "LinkedIn",
        href:
          "https://www.linkedin.com/in/mahmoud-farouk-72737924a",
        kind: "social",
      },
      {
        label: "Email",
        href: "mailto:maf.bns@gmail.com",
        kind: "email",
      },
      {
        label: "Download CV",
        href: "/docs/mahmoud-ahmed-farouk-cv.pdf",
        kind: "download",
      },
    ],
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "About", href: "#about" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ],
  capabilities: [
    {
      title: "Machine learning",
      summary:
        "Structured experiments, preprocessing, model comparison, and evaluation.",
      skills: ["scikit-learn", "XGBoost", "LightGBM", "Pandas", "NumPy"],
    },
    {
      title: "Deep learning & vision",
      summary:
        "CNN architectures, transfer learning, generative models, and visual inference.",
      skills: ["TensorFlow", "Keras", "OpenCV", "CNN", "DCGAN"],
    },
    {
      title: "Retrieval & automation",
      summary:
        "Grounded retrieval, relevance correction, source attribution, and workflow automation.",
      skills: ["ChromaDB", "Gemini", "Embeddings", "RAG", "Python"],
    },
    {
      title: "Product engineering",
      summary:
        "APIs and interfaces that make model behavior visible and usable.",
      skills: ["FastAPI", "Django REST", "Flutter", "PySide6", "SQL"],
    },
  ],
  projects: [
    {
      slug: "genoscene-app",
      title: "GenoScene",
      category: "Featured AI",
      summary:
        "A graduation project exploring forensic DNA phenotyping through probabilistic trait prediction and a mobile product experience.",
      problem:
        "Translate genotype inputs into understandable distributions for visible traits while coordinating mobile, backend, and ML services.",
      approach:
        "A Flutter client communicates with a Django REST and PostgreSQL application layer plus a FastAPI inference service using tabular ML models.",
      contribution:
        "Contributed to the team graduation-project workflow represented by the repository; public copy does not claim sole authorship.",
      outcome:
        "The application reports eye, hair, and skin trait probabilities and can create an explicitly illustrative portrait and PDF summary.",
      stack: [
        "Flutter",
        "Django REST",
        "FastAPI",
        "PostgreSQL",
        "scikit-learn",
        "XGBoost",
        "LightGBM",
      ],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/genoscene-app-1600.avif",
          alt:
            "GenoScene mobile application home interface with an abstract DNA tree",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/GenoScene_app",
        kind: "repository",
      },
      teamContext:
        "Team graduation project. Contributions are described without claiming sole authorship.",
      responsibleUse:
        "Research-oriented probabilities are not definitive identity claims. Any portrait is illustrative.",
    },
    {
      slug: "oralvision",
      title: "OralVision",
      category: "Featured AI",
      summary:
        "A six-class oral disease image-classification study comparing a custom CNN with transfer-learning architectures.",
      problem:
        "Compare model families for a multi-class image task and expose the result through a clear web interface.",
      approach:
        "Trained and evaluated Custom CNN, ResNet50, and EfficientNet-B3 models, then bundled the selected workflow with FastAPI.",
      contribution:
        "Built the documented training comparison, evaluation artifacts, and inference interface.",
      outcome:
        "EfficientNet-B3 produced the strongest repository-reported evaluation and powers the included interface.",
      stack: ["Python", "TensorFlow", "EfficientNet-B3", "FastAPI"],
      metrics: [
        {
          label: "Accuracy",
          value: "98.41%",
          context: "Repository-reported EfficientNet-B3 evaluation",
        },
        {
          label: "Macro F1",
          value: "98.14%",
          context: "Repository-reported EfficientNet-B3 evaluation",
        },
      ],
      evidence: [
        {
          src: "/images/projects/oralvision-1600.avif",
          alt: "OralVision FastAPI classification interface",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href:
          "https://github.com/mahmoudahmed2004/oral-diseases-image-classification",
        kind: "repository",
      },
      responsibleUse:
        "This is a research classifier and is not a clinical diagnosis service.",
    },
    {
      slug: "corrective-rag",
      title: "Corrective RAG System",
      category: "Featured AI",
      summary:
        "A document question-answering system that evaluates retrieval quality, performs one bounded correction, and cites its sources.",
      problem:
        "Keep answers grounded when the first retrieval pass is weak across several document formats.",
      approach:
        "Uses local all-MiniLM-L6-v2 embeddings, ChromaDB retrieval, Gemini relevance evaluation, and at most one query rewrite.",
      contribution:
        "Implemented the documented ingestion, retrieval, correction, attribution, Streamlit interface, and deterministic tests.",
      outcome:
        "The workflow supports PDF, DOCX, TXT, and CSV documents with visible source attribution.",
      stack: [
        "Python",
        "ChromaDB",
        "Hugging Face",
        "Gemini",
        "Streamlit",
      ],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/corrective-rag-1600.avif",
          alt: "Corrective RAG Streamlit document workspace",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href:
          "https://github.com/mahmoudahmed2004/Corrective-RAG-System",
        kind: "repository",
      },
    },
    {
      slug: "realistic-face-dcgan",
      title: "Realistic Face DCGAN",
      category: "Featured AI",
      summary:
        "A TensorFlow and Keras DCGAN experiment trained on 30,000 CelebA images to synthesize 64×64 face samples.",
      problem:
        "Train a stable adversarial image generator and document its progression in a constrained notebook environment.",
      approach:
        "Used convolutional generator and discriminator networks over 30 epochs in the documented Colab T4 environment.",
      contribution:
        "Implemented and trained the documented DCGAN workflow and exported the sample progression.",
      outcome:
        "The repository contains synthetic face grids and final generator and discriminator losses.",
      stack: ["Python", "TensorFlow", "Keras", "DCGAN", "CelebA"],
      metrics: [
        {
          label: "Generator loss",
          value: "2.2427",
          context: "Repository-reported final training loss",
        },
        {
          label: "Discriminator loss",
          value: "0.7276",
          context: "Repository-reported final training loss",
        },
      ],
      evidence: [
        {
          src: "/images/projects/realistic-face-dcgan-1600.avif",
          alt: "Grid of synthetic 64 by 64 face samples generated by the DCGAN",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href:
          "https://github.com/mahmoudahmed2004/Realistic-Face-DCGAN",
        kind: "repository",
      },
      responsibleUse:
        "Every face shown is a synthetic model artifact, not a real person supplied as project evidence.",
    },
    {
      slug: "pos-system",
      title: "Point of Sale System",
      category: "Software System",
      summary:
        "A desktop point-of-sale system covering role-based workflows, inventory, payments, refunds, loyalty, reporting, and kitchen operations.",
      problem:
        "Coordinate everyday retail and restaurant operations in one local desktop application.",
      approach:
        "Built the documented application with PySide6, SQLAlchemy, and SQLite.",
      contribution:
        "Implemented the repository’s desktop workflows and persisted business data through SQLAlchemy.",
      outcome:
        "The repository demonstrates admin and cashier flows, reporting, inventory, and kitchen display screens.",
      stack: ["Python", "PySide6", "SQLAlchemy", "SQLite"],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/pos-system-1600.avif",
          alt: "Point of Sale desktop dashboard",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/pos-system",
        kind: "repository",
      },
    },
    {
      slug: "genoscene-website",
      title: "GenoScene Web Prototype",
      category: "Software System",
      summary:
        "An earlier bilingual product prototype for the GenoScene phenotype-prediction workflow.",
      problem:
        "Explore the interaction and information design of the GenoScene concept before the mobile product matured.",
      approach:
        "Combined a browser interface with the repository’s phenotype-processing and API experiments.",
      contribution:
        "Developed the documented prototype and used it to explore product presentation and interaction.",
      outcome:
        "The prototype records an earlier product iteration and the evolution toward the graduation application.",
      stack: ["JavaScript", "Python", "HTML", "CSS"],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/genoscene-website-1600.avif",
          alt: "GenoScene bilingual web prototype interface",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href:
          "https://github.com/mahmoudahmed2004/GenoScene-website",
        kind: "repository",
      },
      responsibleUse:
        "The prototype explores probabilistic phenotype presentation and is not a definitive identification tool.",
    },
  ],
  experience: [
    {
      organization: "Eram Group",
      role: "Project Management & Admin Support",
      period: "January 2025 — Present",
      type: "Experience",
      summary:
        "Coordinated project tasks, monitored progress, prepared reports, supported team communication, and assisted daily operations.",
    },
    {
      organization: "INSTANT Software Solutions",
      role: "AI & Machine Learning Trainee",
      period: "July 2025 — December 2025",
      type: "Training",
      summary:
        "Regression, classification, clustering, TensorFlow, CNNs, RNNs, computer vision, NLP, YOLO, OpenCV, and introductory LLM workflows.",
    },
    {
      organization: "Div Academy",
      role: "AI & Machine Learning Trainee",
      period: "August 2024 — October 2024",
      type: "Training",
      summary:
        "Practical machine-learning training recorded in the supplied CV.",
    },
    {
      organization: "IT Gate Academy",
      role: "CCNA Trainee",
      period: "August 2023 — October 2023",
      type: "Training",
      summary:
        "Networking fundamentals, routing, switching, and troubleshooting.",
    },
    {
      organization: "Enactus",
      role: "IT Team Member",
      period: "January 2023 — May 2023",
      type: "Student activity",
      summary:
        "Technical student-team participation recorded in the supplied CV.",
    },
    {
      organization: "Modern Academy",
      role: "Computer Science Graduate",
      period: "2022 — 2026",
      type: "Education",
      summary:
        "Computer Science Graduate — Modern Academy, Class of 2026.",
    },
  ],
  certificates: [
    {
      slug: "instant-ai-diploma",
      title: "AI Diploma",
      issuer: "INSTANT Software Solutions",
      year: "2025",
      detail: "170 training hours · issued 1 December 2025",
      image: "/images/certificates/instant-ai-diploma.webp",
      original: "/images/certificates/instant-ai-diploma.webp",
    },
    {
      slug: "digitopia-2025",
      title: "Digitopia 2025",
      issuer: "Egypt Ministry of Communications and Information Technology",
      year: "2025",
      detail: "Software Solutions and AI track · university students",
      image: "/images/certificates/digitopia-2025.webp",
      original: "/docs/certificates/digitopia-2025.pdf",
    },
    {
      slug: "build-with-ai-masr",
      title: "Build with AI — Masr Edition",
      issuer: "Google for Developers & ITI",
      year: "2025",
      detail: "Build with AI participation certificate",
      image: "/images/certificates/build-with-ai-masr.webp",
      original: "/docs/certificates/build-with-ai-masr.pdf",
    },
  ],
} satisfies PortfolioData;
```

- [ ] **Step 5: Run the data tests**

Run:

```powershell
npm run test -- lib/portfolio-data.test.ts
```

Expected: all six tests pass.

- [ ] **Step 6: Switch `app/page.tsx` to a compile-safe temporary page**

Replace it with:

```tsx
import { portfolio } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <main id="main-content">
      <h1>{portfolio.identity.name}</h1>
      <p>{portfolio.identity.headline}</p>
    </main>
  );
}
```

Then remove the obsolete MDX content tree and `lib/content.ts`.

- [ ] **Step 7: Verify type safety and commit**

Run:

```powershell
npm run test
npm run typecheck
git add app/page.tsx lib/portfolio-data.ts lib/portfolio-data.test.ts lib/content.ts content
git commit -m "feat: add verified portfolio content model"
```

Expected: tests and type-check pass; commit succeeds.

---

### Task 3: Prepare honest project imagery and verified public documents

**Files:**
- Create: `scripts/prepare-portfolio-assets.mjs`
- Create: `scripts/verify-public-assets.mjs`
- Create: `public/images/projects/*`
- Modify: `public/images/certificates/*`
- Create: `public/docs/mahmoud-ahmed-farouk-cv.pdf`
- Create: `public/docs/mahmoud-ahmed-farouk-cv.docx`
- Delete: `public/docs/mahmoud-farok-resume.docx`

**Interfaces:**
- Consumes: real repository screenshots under `../github-projects`, the three existing certificate files, and approved public identity data.
- Produces: optimized 1600×1000 AVIF and 960×600 WebP project derivatives; an English CV with no phone number; verified certificate derivatives.

- [ ] **Step 1: Stage the six real source images in ignored `.tools/source-assets`**

Use PowerShell `Copy-Item -LiteralPath` for the five existing sources:

```powershell
New-Item -ItemType Directory -Force -Path '.tools/source-assets' | Out-Null
Copy-Item -LiteralPath '..\github-projects\GenoScene_app\assets\images\home.png' -Destination '.tools\source-assets\genoscene-app.png'
Copy-Item -LiteralPath '..\github-projects\oral-diseases-image-classification\oralvision_fastapi_bundle\artifacts\oralvision-pearl-desktop.png' -Destination '.tools\source-assets\oralvision.png'
Copy-Item -LiteralPath '..\github-projects\Corrective-RAG-System\assets\streamlit-home.png' -Destination '.tools\source-assets\corrective-rag.png'
Copy-Item -LiteralPath '..\github-projects\Realistic-Face-DCGAN\Project4.1_GAN\samples\final_faces.png' -Destination '.tools\source-assets\realistic-face-dcgan.png'
Copy-Item -LiteralPath '..\github-projects\pos-system\docs\screenshots\dashboard.png' -Destination '.tools\source-assets\pos-system.png'
```

Expected: five staged source images exist. Inspect each visually before continuing.

- [ ] **Step 2: Capture the GenoScene web prototype from its real local code**

Run its documented local server from `../github-projects/GenoScene-website`, open the page at 1440×900 with the browser-testing workflow, and save the screenshot to:

```text
.tools/source-assets/genoscene-website.png
```

The screenshot must show the actual application interface. It must not contain `assets/banner-home.jpg` or any visible watermark.

- [ ] **Step 3: Write the deterministic Sharp conversion script**

Create `scripts/prepare-portfolio-assets.mjs`:

```js
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
```

- [ ] **Step 4: Run image preparation**

Run:

```powershell
npm run assets:prepare
```

Expected: twelve derivatives are created and no output file exceeds 500 KB.

- [ ] **Step 5: Create the public CV using the documents and PDF workflows**

Create a clean one- or two-page English CV with:

- Name: Mahmoud Ahmed Farouk
- Title: AI Engineer
- Headline: the approved exact headline
- Location: Cairo, Egypt
- Email: `maf.bns@gmail.com`
- LinkedIn and GitHub URLs
- Summary based on the approved biography
- Education marked as graduated, Class of 2026
- The five verified experience/training entries
- The six verified projects, with the four AI projects prioritized
- The three verified certificates
- No phone number anywhere, including document properties

Save and visually verify both:

```text
public/docs/mahmoud-ahmed-farouk-cv.docx
public/docs/mahmoud-ahmed-farouk-cv.pdf
```

Render the PDF to images and inspect every page for clipping, empty pages, font substitution, and broken URLs.

- [ ] **Step 6: Write public-asset verification**

Create `scripts/verify-public-assets.mjs`:

```js
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
```

- [ ] **Step 7: Remove the old CV, verify assets, and commit**

Run:

```powershell
$publicDocs = (Resolve-Path -LiteralPath 'public/docs').Path
$oldCv = (Resolve-Path -LiteralPath 'public/docs/mahmoud-farok-resume.docx').Path
if (-not $oldCv.StartsWith($publicDocs, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'Old CV resolved outside public/docs'
}
Remove-Item -LiteralPath $oldCv
npm run assets:verify
git add scripts public/images/projects public/images/certificates public/docs
git commit -m "feat: add verified project media and public CV"
```

Expected: `Public assets verified.` and a successful commit.

---

### Task 4: Build the Observatory shell and responsive navigation

**Files:**
- Replace: `app/layout.tsx`
- Replace: `app/globals.css`
- Create: `components/shell/site-header.tsx`
- Create: `components/shell/site-footer.tsx`
- Create: `components/shell/section-heading.tsx`
- Create: `tests/site-header.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `portfolio.navigation` and `portfolio.identity.links`.
- Produces: `SiteHeader({ items })`, `SiteFooter()`, `SectionHeading({ eyebrow, title, description? })`, stable `#main-content`, and Observatory design tokens.

- [ ] **Step 1: Write failing navigation tests**

Create `tests/site-header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";

describe("SiteHeader", () => {
  it("opens and closes the mobile navigation accessibly", async () => {
    const user = userEvent.setup();
    render(<SiteHeader items={portfolio.navigation} />);
    const button = screen.getByRole("button", { name: /open menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
```

- [ ] **Step 2: Verify the component is missing**

Run:

```powershell
npm run test -- tests/site-header.test.tsx
```

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement the complete header behavior**

`components/shell/site-header.tsx` must:

- Start with `"use client"`.
- Accept `items: { label: string; href: string }[]`.
- Render a desktop `nav` and a mobile `nav`.
- Use a semantic button with `aria-expanded` and `aria-controls="mobile-navigation"`.
- Close on Escape and after selecting a mobile link.
- Restore focus to the menu button on Escape.
- Render `MAF / AI` as the home mark.
- Use no theme toggle; the approved experience is dark-first.

- [ ] **Step 4: Replace the design tokens and global primitives**

`app/globals.css` must define:

```css
:root {
  --background: #040611;
  --surface: #090d1c;
  --surface-raised: #0e1428;
  --text: #f5f7ff;
  --muted: #9aa6c4;
  --cyan: #78efff;
  --blue: #5570ff;
  --violet: #a56cff;
  --lilac: #d7c7ff;
  --line: rgb(255 255 255 / 0.12);
  --content-width: 80rem;
  --radius-sm: 0.75rem;
  --radius-md: 1.25rem;
  color-scheme: dark;
}
```

Also include:

- `scroll-behavior: smooth` only outside reduced motion.
- Body background with restrained radial light and no generic star texture.
- `.skip-link`, `.site-shell`, `.section-shell`, `.eyebrow`, `.focus-ring`, and `.sr-only`.
- A visible `:focus-visible` outline using `--cyan`.
- Minimum 44×44 px interactive targets.
- Reduced-motion rules that remove scroll-linked animations and smooth scrolling.

- [ ] **Step 5: Replace layout metadata and fonts**

Use `next/font/google` with a display and body family available through Next’s built-in font pipeline, restrict each to required Latin subsets and weights, and render:

```tsx
<html lang="en">
  <body>
    <a className="skip-link" href="#main-content">
      Skip to content
    </a>
    {children}
  </body>
</html>
```

Set metadata title template, approved description, and default social identity. Do not set the production canonical URL until deployment supplies it.

- [ ] **Step 6: Assemble a shell-only page**

`app/page.tsx` must render `SiteHeader`, `<main id="main-content">`, the approved section IDs in order, and `SiteFooter`. Use temporary semantic headings for unimplemented sections so every navigation link already has a target.

- [ ] **Step 7: Run tests and commit**

Run:

```powershell
npm run test -- tests/site-header.test.tsx
npm run lint
npm run typecheck
git add app components/shell tests/site-header.test.tsx
git commit -m "feat: build neural observatory site shell"
```

Expected: test, lint, and type-check pass.

---

### Task 5: Build the hero, expertise pipeline, and capability constellation

**Files:**
- Create: `components/sections/hero.tsx`
- Create: `components/sections/expertise-pipeline.tsx`
- Create: `components/sections/capability-constellation.tsx`
- Create: `components/motion/reveal.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `portfolio.identity`, `portfolio.capabilities`, and `Reveal({ children, className? })`.
- Produces: server-rendered hero and expertise content with actions to `#work`, GitHub, LinkedIn, Email, and the public CV.

- [ ] **Step 1: Write the first semantic browser test**

Create `tests/portfolio.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("presents Mahmoud as an AI Engineer with public contact actions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Mahmoud Ahmed Farouk",
    }),
  ).toBeVisible();
  await expect(page.getByText("AI Engineer", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /explore selected work/i }))
    .toHaveAttribute("href", "#work");
  await expect(page.getByRole("link", { name: /download cv/i }))
    .toHaveAttribute("href", "/docs/mahmoud-ahmed-farouk-cv.pdf");
  await expect(page.locator("body")).not.toContainText("01026889007");
});

test("renders grouped expertise as semantic content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /signal to intelligence/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Machine learning" }))
    .toBeVisible();
  await expect(page.getByRole("heading", { name: "Product engineering" }))
    .toBeVisible();
});
```

- [ ] **Step 2: Verify the test fails on missing approved content**

Run:

```powershell
npx playwright install chromium
npm run test:e2e -- tests/portfolio.spec.ts
```

Expected: at least one assertion fails because the final hero and expertise sections are absent.

- [ ] **Step 3: Implement `Reveal` as progressive enhancement**

Create `components/motion/reveal.tsx` as a Client Component using Motion’s `motion.div` and `useReducedMotion`. It must render visible content before intersection, use a small `y: 18` and opacity transition only when motion is allowed, run once, and accept standard `HTMLAttributes<HTMLDivElement>`.

- [ ] **Step 4: Implement the hero**

`Hero` must:

- Render inside `<section id="intro" aria-labelledby="hero-title">`.
- Use the exact approved name and headline.
- Render `AI Engineer` as the role label.
- Render the approved introduction.
- Render `Explore selected work`, `GitHub`, `LinkedIn`, `Email`, and `Download CV` as semantic links.
- Reserve a right-side `.hero-bloom-slot` for the 2D/3D bloom with a stable aspect ratio.
- Include a short signal legend: `Observe · Learn · Evaluate · Deliver`.
- Never render a portrait or phone number.

- [ ] **Step 5: Implement expertise and capabilities**

`ExpertisePipeline` renders four numbered stages from `portfolio.capabilities`. `CapabilityConstellation` renders the same data as grouped semantic lists with visual connector lines hidden from assistive technology. Do not render technology logos.

- [ ] **Step 6: Update the page and visual styles**

Place Hero first, Expertise at `#expertise`, and CapabilityConstellation after the project sections. Add responsive styles for:

- Two-column hero above 960 px and single-column below.
- `clamp()` headline sizing.
- A 70-character maximum paragraph width.
- Horizontal pipeline on wide screens and vertical pipeline on mobile.
- No horizontal overflow at 320 px.

- [ ] **Step 7: Run browser tests and commit**

Run:

```powershell
npm run test:e2e -- tests/portfolio.spec.ts
npm run lint
npm run typecheck
git add app/page.tsx app/globals.css components/sections components/motion/reveal.tsx tests/portfolio.spec.ts
git commit -m "feat: add AI-first hero and expertise narrative"
```

---

### Task 6: Build evidence-based AI and software case studies

**Files:**
- Create: `components/work/project-case-study.tsx`
- Create: `components/work/project-evidence.tsx`
- Create: `components/work/responsible-use-note.tsx`
- Create: `components/sections/featured-work.tsx`
- Create: `components/sections/software-systems.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `PortfolioProject`.
- Produces: `ProjectCaseStudy({ project, index })`, `ProjectEvidence({ evidence, title })`, and `ResponsibleUseNote({ children })`.

- [ ] **Step 1: Add failing project coverage tests**

Append:

```ts
test("renders all six verified projects and responsible-use notes", async ({
  page,
}) => {
  await page.goto("/");
  for (const title of [
    "GenoScene",
    "OralVision",
    "Corrective RAG System",
    "Realistic Face DCGAN",
    "Point of Sale System",
    "GenoScene Web Prototype",
  ]) {
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }
  await expect(page.getByText(/not definitive identity claims/i)).toBeVisible();
  await expect(page.getByText(/not a clinical diagnosis service/i)).toBeVisible();
  await expect(page.getByText(/synthetic model artifact/i)).toBeVisible();
});

test("labels repository-reported metrics with context", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("98.41%")).toBeVisible();
  await expect(
    page.getByText("Repository-reported EfficientNet-B3 evaluation").first(),
  ).toBeVisible();
});
```

- [ ] **Step 2: Run the tests and verify missing project sections**

Run:

```powershell
npm run test:e2e -- tests/portfolio.spec.ts
```

Expected: the new project assertions fail.

- [ ] **Step 3: Implement reusable evidence components**

`ProjectEvidence` uses `next/image` with:

```tsx
sizes="(min-width: 1200px) 46vw, (min-width: 768px) 80vw, 100vw"
```

It renders the 1600×1000 AVIF as the canonical image, reserves its aspect ratio, and applies no zoom animation when reduced motion is enabled.

`ResponsibleUseNote` renders an `<aside aria-label="Responsible use note">` with visible `Research context` text.

- [ ] **Step 4: Implement the project case-study contract**

`ProjectCaseStudy` must render:

- A numbered project index.
- Category, title, summary, problem, approach, contribution, and outcome.
- Stack as a semantic list.
- Metric values paired with their context.
- Real evidence imagery and exact alt text from data.
- Team context when present, so collaborative work never implies sole authorship.
- Responsible-use note when present.
- Repository link with an accessible external-link label.

Alternate media/text placement by index on wide screens without changing DOM reading order.

- [ ] **Step 5: Implement featured and supporting sections**

`FeaturedWork` filters `category === "Featured AI"` and renders four projects beneath `<section id="work">`. `SoftwareSystems` filters `category === "Software System"` and renders two more compact case studies. Both remain Server Components.

- [ ] **Step 6: Style for evidence, not generic cards**

Use full-width editorial case studies with one dominant image, fine data rails, and generous spacing. Avoid a uniform three-column card grid. On mobile, all content is linear and repository actions remain at least 44 px tall.

- [ ] **Step 7: Run tests and commit**

Run:

```powershell
npm run test:e2e -- tests/portfolio.spec.ts
npm run lint
npm run typecheck
git add components/work components/sections app/page.tsx app/globals.css tests/portfolio.spec.ts
git commit -m "feat: present verified AI and software case studies"
```

---

### Task 7: Add experience, certificates, CV, about, and contact

**Files:**
- Create: `components/sections/experience-timeline.tsx`
- Create: `components/sections/certificate-gallery.tsx`
- Create: `components/sections/about-cv.tsx`
- Create: `components/sections/contact.tsx`
- Create: `tests/certificate-gallery.test.tsx`
- Create: `app/cv/page.tsx`
- Create: `app/cv/print.css`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: identity, experience, and certificates from `portfolio`.
- Produces: keyboard-accessible `CertificateGallery`, printable `/cv`, semantic timeline, and direct contact actions.

- [ ] **Step 1: Write a failing certificate-gallery interaction test**

Create `tests/certificate-gallery.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CertificateGallery } from "@/components/sections/certificate-gallery";
import { portfolio } from "@/lib/portfolio-data";

describe("CertificateGallery", () => {
  it("opens a certificate dialog and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(<CertificateGallery certificates={portfolio.certificates} />);
    const trigger = screen.getByRole("button", {
      name: /open ai diploma certificate/i,
    });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: /ai diploma/i })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 2: Verify the missing component failure**

Run:

```powershell
npm run test -- tests/certificate-gallery.test.tsx
```

Expected: FAIL because `CertificateGallery` does not exist.

- [ ] **Step 3: Implement the certificate dialog**

The Client Component must:

- Use a real `<dialog>` element.
- Open with `.showModal()`.
- Close on Escape, backdrop click, or the visible Close button.
- Restore focus to the exact triggering button.
- Render the compressed image, title, issuer, year, detail, and an original-file link.
- Lock no global scrolling when the dialog is closed.

- [ ] **Step 4: Implement timeline, about, and contact**

`ExperienceTimeline` renders all six entries as an ordered list. `AboutCV` uses the approved biography, graduate statement, and PDF/DOCX actions. `Contact` renders Email, LinkedIn, and GitHub only. Do not use a contact form.

- [ ] **Step 5: Implement the printable CV route**

`app/cv/page.tsx` must use the same `portfolio` object and render identity, summary, skills, projects, experience, education, and certificates. It must contain no client component and no phone number. `app/cv/print.css` sets A4 sizing, black-on-white output, visible URLs, controlled page breaks, and hides site navigation.

- [ ] **Step 6: Add browser assertions**

Append:

```ts
test("presents graduate status, certificates, and safe contact methods", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("Computer Science Graduate — Modern Academy, Class of 2026"),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Certificates" })).toBeVisible();
  await expect(page.getByRole("link", { name: /linkedin/i }).last())
    .toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/mahmoud-farouk-72737924a",
    );
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});
```

- [ ] **Step 7: Run tests and commit**

Run:

```powershell
npm run test
npm run test:e2e -- tests/portfolio.spec.ts
npm run lint
npm run typecheck
git add components/sections app tests
git commit -m "feat: add experience credentials CV and contact"
```

---

### Task 8: Add one connected scroll state and a resilient 2D Neural Bloom

**Files:**
- Create: `lib/scene-quality.ts`
- Create: `lib/scene-quality.test.ts`
- Create: `components/scene/use-scene-quality.ts`
- Create: `components/motion/observatory-provider.tsx`
- Create: `components/scene/neural-bloom-2d.tsx`
- Create: `components/scene/neural-bloom-loader.tsx`
- Create: `public/images/neural-bloom-fallback.svg`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: browser capability signals and section IDs.
- Produces: `selectSceneQuality(signals): "static" | "low" | "high"`, `useSceneQuality()`, and `useObservatory()` exposing `scrollYProgress`, `activePhase`, and `motionAllowed`.

- [ ] **Step 1: Write the failing quality-selection tests**

Create `lib/scene-quality.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { selectSceneQuality } from "@/lib/scene-quality";

const capable = {
  webgl: true,
  reducedMotion: false,
  saveData: false,
  deviceMemory: 8,
  mobile: false,
  contextLost: false,
};

describe("selectSceneQuality", () => {
  it.each([
    ["no WebGL", { ...capable, webgl: false }],
    ["reduced motion", { ...capable, reducedMotion: true }],
    ["data saver", { ...capable, saveData: true }],
    ["context loss", { ...capable, contextLost: true }],
  ])("returns static for %s", (_label, signals) => {
    expect(selectSceneQuality(signals)).toBe("static");
  });

  it("returns low for mobile and low-memory devices", () => {
    expect(selectSceneQuality({ ...capable, mobile: true })).toBe("low");
    expect(selectSceneQuality({ ...capable, deviceMemory: 4 })).toBe("low");
  });

  it("returns high for a capable desktop", () => {
    expect(selectSceneQuality(capable)).toBe("high");
  });
});
```

- [ ] **Step 2: Verify the missing utility failure**

Run:

```powershell
npm run test -- lib/scene-quality.test.ts
```

Expected: FAIL because `scene-quality.ts` does not exist.

- [ ] **Step 3: Implement the pure quality selector**

Create `lib/scene-quality.ts`:

```ts
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
```

- [ ] **Step 4: Implement browser signal collection**

`useSceneQuality` must:

- Start at `"static"` so SSR and hydration match.
- Detect WebGL by creating and immediately discarding an unattached canvas context.
- Read `matchMedia("(prefers-reduced-motion: reduce)")`.
- Read `navigator.connection?.saveData` through a local extended type.
- Read `navigator.deviceMemory` through a local extended type.
- Read `matchMedia("(max-width: 767px)")`.
- Expose `markContextLost()` so the canvas can permanently fall back for the session.
- Subscribe and unsubscribe to media-query changes.

- [ ] **Step 5: Implement a single Observatory context**

`ObservatoryProvider` wraps the page, uses Motion `useScroll()`, derives these phases, and provides them through context:

```ts
export type ObservatoryPhase =
  | "seed"
  | "expertise"
  | "work"
  | "timeline"
  | "contact";
```

Use IntersectionObserver on `[data-observatory-phase]`, selecting the most visible section. The provider must not hide or delay children.

- [ ] **Step 6: Implement the 2D Neural Bloom**

`NeuralBloom2D` renders the local SVG using semantic-hidden markup:

```tsx
<div className="neural-bloom-fallback" aria-hidden="true">
  <img src="/images/neural-bloom-fallback.svg" alt="" />
</div>
```

Create the SVG with six translucent gradient petals, a luminous core, and no embedded raster image or animation.

- [ ] **Step 7: Connect the fallback to the page**

`NeuralBloomLoader` initially renders only `NeuralBloom2D`. Place it in the hero bloom slot and expose `data-scene-quality`. Add `data-observatory-phase` to Hero, Expertise, Featured Work, Experience, and Contact sections.

- [ ] **Step 8: Run tests and commit**

Run:

```powershell
npm run test -- lib/scene-quality.test.ts
npm run lint
npm run typecheck
npm run build
git add lib components/motion components/scene public/images/neural-bloom-fallback.svg app
git commit -m "feat: add resilient observatory motion foundation"
```

---

### Task 9: Progressively enhance the fallback with the procedural 3D Neural Bloom

**Files:**
- Create: `components/scene/neural-bloom-model.tsx`
- Create: `components/scene/neural-bloom-scene.tsx`
- Modify: `components/scene/neural-bloom-loader.tsx`
- Modify: `app/globals.css`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `SceneQuality`, shared `scrollYProgress`, `activePhase`, and `markContextLost`.
- Produces: a dynamically imported canvas with procedural bloom geometry and quality-bounded rendering.

- [ ] **Step 1: Add a WebGL-independent fallback browser test**

Append:

```ts
test("keeps the Neural Bloom fallback when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('[data-scene-quality="static"]')).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
```

- [ ] **Step 2: Run the test and verify current loader behavior**

Run:

```powershell
npm run test:e2e -- tests/portfolio.spec.ts
```

Expected: fallback test passes before 3D is added; it becomes a regression guard.

- [ ] **Step 3: Implement the procedural model**

`NeuralBloomModel` must:

- Build six petals from one reused `SphereGeometry` or `RoundedBoxGeometry` transformed into elongated organic lobes.
- Use one shared `MeshPhysicalMaterial` with transmission, controlled roughness, and no external texture.
- Render a small emissive core.
- Use at most 36 signal points in high quality and 12 in low quality.
- Reuse geometry and material instances with `useMemo`.
- Map `scrollYProgress.get()` inside `useFrame` to petal openness, group rotation, vertical position, and scale.
- Use damped interpolation rather than assigning abrupt phase changes.
- Disable pointer events and interaction handlers.

The phase mapping is:

```ts
const phaseTargets = {
  seed: { openness: 0.18, scale: 0.82, rotationY: 0.1 },
  expertise: { openness: 0.58, scale: 1, rotationY: 0.55 },
  work: { openness: 1, scale: 1.08, rotationY: 1.05 },
  timeline: { openness: 0.42, scale: 0.86, rotationY: 1.55 },
  contact: { openness: 0.68, scale: 0.78, rotationY: 2.05 },
} as const;
```

- [ ] **Step 4: Implement the bounded scene**

`NeuralBloomScene` renders:

- `<Canvas dpr={quality === "high" ? [1, 1.5] : 1}>`.
- A transparent background.
- One ambient light and at most three controlled colored lights.
- `frameloop="always"` while visible and `"demand"` when paused.
- An IntersectionObserver or `useInView` gate for offscreen pausing.
- `webglcontextlost` handling that calls `markContextLost`.
- No shadows, post-processing, environment HDR, physics, loaders, or model files.

- [ ] **Step 5: Dynamically load the scene**

In `neural-bloom-loader.tsx`, use:

```tsx
const NeuralBloomScene = dynamic(
  () =>
    import("@/components/scene/neural-bloom-scene").then(
      ({ NeuralBloomScene }) => NeuralBloomScene,
    ),
  { ssr: false },
);
```

Render the 2D fallback at all times and fade the canvas over it only after `onCreated`. Never reserve a second layout box.

- [ ] **Step 6: Verify reduced motion, mobile, and desktop**

Run:

```powershell
npm run test
npm run test:e2e -- tests/portfolio.spec.ts
npm run lint
npm run typecheck
npm run build
```

Expected: reduced-motion test sees no canvas; desktop capable browser sees one canvas after hydration; all checks pass.

- [ ] **Step 7: Commit**

```powershell
git add components/scene app/globals.css tests/portfolio.spec.ts
git commit -m "feat: add progressive neural bloom scene"
```

---

### Task 10: Add final metadata, structured data, sitemap, and social image

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `components/seo/structured-data.tsx`
- Create: `public/images/og/neural-observatory-1200x630.png`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: final production URL from the hosting configuration and `portfolio`.
- Produces: metadata, `Person` and `SoftwareSourceCode` JSON-LD, sitemap, robots, and one final social image.

- [ ] **Step 1: Write failing metadata assertions**

Append:

```ts
test("ships AI-focused metadata and structured data", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Mahmoud Ahmed Farouk.*AI Engineer/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /machine learning.*computer vision/i,
  );
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(jsonLd.join(" ")).toContain('"@type":"Person"');
  expect(jsonLd.join(" ")).toContain('"@type":"SoftwareSourceCode"');
});
```

- [ ] **Step 2: Verify the missing structured-data failure**

Run:

```powershell
npm run test:e2e -- tests/portfolio.spec.ts
```

Expected: JSON-LD assertion fails.

- [ ] **Step 3: Implement structured data without HTML injection**

`StructuredData` accepts a serializable object, replaces `<` with `\u003c`, and renders one `script` element. Render a `Person` object and one `SoftwareSourceCode` object per project with public repository URLs.

- [ ] **Step 4: Add route metadata**

Set:

- Title: `Mahmoud Ahmed Farouk — AI Engineer`
- Description: `AI Engineer building machine learning, deep learning, computer vision, retrieval, automation, and Python systems.`
- Open Graph type `website`.
- Open Graph image `/images/og/neural-observatory-1200x630.png`, 1200×630.
- Twitter card `summary_large_image`.
- `metadataBase` from the verified production deployment URL.

- [ ] **Step 5: Create sitemap and robots**

`app/sitemap.ts` returns `/` and `/cv`. `app/robots.ts` allows `/`, references the production sitemap, and does not disallow project assets or the public CV.

- [ ] **Step 6: Generate exactly one final Open Graph image**

Read the imagegen skill completely, then use the approved Neural Bloom identity after the production hero is visually stable. The image must:

- Be exactly 1200×630.
- Use the near-black Observatory background, translucent Neural Bloom, approved name, and `AI Engineer`.
- Contain no stock imagery, technology logo cloud, portrait, or phone number.
- Be generated once, saved to the exact target path, and visually inspected at full size.

- [ ] **Step 7: Test and commit**

Run:

```powershell
npm run test:e2e -- tests/portfolio.spec.ts
npm run lint
npm run typecheck
npm run build
git add app components/seo public/images/og tests/portfolio.spec.ts
git commit -m "feat: add portfolio metadata and social identity"
```

---

### Task 11: Accessibility, responsive, failure-mode, and performance verification

**Files:**
- Create: `tests/accessibility.spec.ts`
- Modify: `tests/portfolio.spec.ts`
- Modify: affected components and `app/globals.css` only when verification finds a reproducible issue.
- Modify: `next.config.ts` only if measured image or bundle behavior requires a documented setting.

**Interfaces:**
- Consumes: complete local production build.
- Produces: passing axe scan, keyboard path, small-screen layout, reduced-motion fallback, failed-WebGL fallback, verified links, and recorded performance evidence.

- [ ] **Step 1: Add automated accessibility tests**

Create `tests/accessibility.spec.ts`:

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no automatically detectable serious accessibility issues", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(({ impact }) =>
    ["serious", "critical"].includes(impact ?? ""),
  );
  expect(serious).toEqual([]);
});

test("supports a keyboard-only primary journey", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
```

- [ ] **Step 2: Run browser and accessibility tests against production**

Run:

```powershell
npm run build
npm run start
```

In a second terminal:

```powershell
npm run test:e2e
```

Expected: all Chromium desktop and Pixel 7 tests pass.

- [ ] **Step 3: Perform manual keyboard and screen-reader-structure review**

Verify:

- Skip link is first.
- Header, all external actions, CV links, project links, and certificate dialog are reachable.
- Focus never disappears behind the sticky header or dialog.
- Escape closes the menu and certificate dialog and restores focus.
- Heading levels remain sequential.
- Project screenshots have meaningful alt text.
- Decorative bloom, lines, grids, and particles are hidden from assistive technology.

- [ ] **Step 4: Verify responsive layouts**

Capture and inspect:

- 320×568
- 390×844
- 768×1024
- 1440×900
- 1920×1080

Confirm no horizontal overflow, clipped headlines, unreadable evidence, tiny actions, or canvas overlap with content.

- [ ] **Step 5: Verify fallback modes**

Test:

- JavaScript disabled: identity, projects, experience, certificates, and contact remain readable.
- Reduced motion: no canvas and no scroll-linked transforms.
- WebGL disabled: 2D bloom remains visible.
- Data saver: static quality.
- Context loss: canvas is removed and fallback persists.
- Missing project image: branded text fallback appears without layout shift.

- [ ] **Step 6: Measure performance**

Use a production build and a representative mid-range mobile Lighthouse profile. Record:

- LCP
- CLS
- INP or Total Blocking Time when lab tooling cannot supply INP
- Initial JS transferred
- Three.js chunk size
- Largest image transfer

If a target fails, change only the measured cause and rerun. Do not lower the target or remove semantic content.

- [ ] **Step 7: Run the full final verification**

Run:

```powershell
npm run assets:verify
npm run test
npm run test:e2e
npm run lint
npm run typecheck
npm run build
git status --short
```

Expected: every command passes and `git status --short` shows only intentional verification changes.

- [ ] **Step 8: Commit verified fixes**

```powershell
git add app components lib tests next.config.ts
git commit -m "fix: harden portfolio accessibility and performance"
```

Skip this commit only if verification required no source changes.

---

### Task 12: Deploy the exact verified source and validate production

**Files:**
- Create or update: `.openai/hosting.json` through the Sites workflow.
- No source changes after the final verified commit unless production reveals a reproducible defect.

**Interfaces:**
- Consumes: clean, committed, fully verified repository state.
- Produces: saved Sites version, production deployment URL, canonical metadata updated to that exact URL, and a final production validation.

- [ ] **Step 1: Load the Sites building and hosting skills**

Read both skill files completely. Check for `.openai/hosting.json` before creating a site. Reuse its opaque `project_id` exactly when it exists and never create a second site for the same source.

- [ ] **Step 2: Push the exact source state required by Sites**

Record:

```powershell
git status --short
git rev-parse HEAD
```

Expected: clean status and one commit SHA identifying the source being deployed.

- [ ] **Step 3: Save a Sites version**

Use the Sites connector to push the exact committed source, save a version tied to the exact commit SHA, and wait for a terminal build result. Do not deploy an unsaved or mismatched source state.

- [ ] **Step 4: Deploy the saved version**

Deploy only the saved version. Treat the returned URL as production.

- [ ] **Step 5: Set and verify canonical metadata**

If the production URL was unavailable before Task 10, set `metadataBase`, sitemap origin, and robots sitemap to this exact URL, rerun the full verification, commit, save a new Sites version, and deploy that version.

- [ ] **Step 6: Validate production**

Verify:

- Home and `/cv` return successfully.
- Project, GitHub, LinkedIn, email, CV, and certificate actions resolve correctly.
- Social image is 1200×630 and metadata uses the production origin.
- Mobile layout and reduced-motion fallback behave as local verification did.
- No phone number appears in page text, source, structured data, CV, or document properties.

- [ ] **Step 7: Record the deployed result**

Record the final source commit, saved version identifier, deployment status, and production URL in the task handoff. Do not report completion until deployment is terminal and production validation passes.
