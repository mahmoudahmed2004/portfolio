# Mahmoud Ahmed Farouk — AI Portfolio Design Specification

**Date:** 2026-07-29

**Status:** Approved visual, content, architecture, and asset direction

**Site language:** English only

## 1. Product intent

Build a completely new portfolio that positions Mahmoud Ahmed Farouk first as an AI Engineer and second as a software developer. The site should feel like a premium, soft-futuristic AI observatory rather than a generic space template.

The portfolio must demonstrate technical depth through real evidence: project interfaces, model results, architecture decisions, safeguards, and useful software outcomes. The 3D layer supports that story but never replaces readable content.

### Primary identity

**Name:** Mahmoud Ahmed Farouk

**Headline:** AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python

**Education:** Computer Science Graduate — Modern Academy, Class of 2026

**Location:** Cairo, Egypt

**GitHub:** https://github.com/mahmoudahmed2004

**LinkedIn:** https://www.linkedin.com/in/mahmoud-farouk-72737924a

**Email:** maf.bns@gmail.com

The public site and public CV must not display a phone number.

## 2. Goals

- Make AI engineering the unmistakable first impression.
- Present six real projects with accurate, inspectable evidence.
- Make the portfolio visually distinctive without sacrificing performance.
- Use one connected scroll narrative rather than unrelated animation effects.
- Work well on phones, keyboards, low-power devices, reduced-motion settings, and browsers without WebGL.
- Produce strong semantic HTML, metadata, structured data, and share imagery.
- Keep project, certificate, experience, and contact content easy to update.

## 3. Non-goals

- A literal galaxy scene with planets, astronaut imagery, or orbiting technology logos.
- A full-page WebGL application where text only exists inside a canvas.
- Stock imagery or unrelated generated artwork used as project evidence.
- Heavy post-processing, video backgrounds, or several simultaneous 3D scenes.
- Inflated claims, invented client work, or unsupported project metrics.

## 4. Visual direction

### Name

**Neural Observatory — Neural Bloom**

### Core idea

A single translucent 3D intelligence form evolves throughout the page. It begins as a compact neural seed, unfolds into a six-petal bloom, separates into a project constellation, and reconnects as a quiet signal at the contact section.

The form represents a repeatable AI process:

1. Observe a signal.
2. Learn a representation.
3. Evaluate a system.
4. Deliver a useful outcome.

### Visual character

- Premium AI research lab combined with soft-futuristic editorial art direction.
- Near-black midnight navy canvas with controlled electric blue, cyan, violet, and lilac light.
- Large editorial typography and generous negative space.
- Limited glass surfaces used for hierarchy, not as a universal card style.
- Project screenshots remain visually honest and are framed as evidence.
- Fine grids, signal traces, coordinates, and restrained data labels may reinforce the observatory language.

### Suggested design tokens

| Role | Value |
| --- | --- |
| Background | `#040611` |
| Elevated background | `#090D1C` |
| Primary text | `#F5F7FF` |
| Muted text | `#9AA6C4` |
| Cyan signal | `#78EFFF` |
| Electric blue | `#5570FF` |
| Violet | `#A56CFF` |
| Soft lilac | `#D7C7FF` |
| Hairline | `rgba(255,255,255,0.12)` |

The final palette must pass WCAG AA for normal text. Accent colors must not be the only way to communicate state.

### Typography

Use a distinctive variable display face for headlines and a highly legible sans-serif for body and interface text. Fonts should be self-hosted through Next.js, subset to Latin, and limited to the weights actually used. The final choice must preserve a technical/editorial tone without imitating common space-portfolio templates.

## 5. Narrative and information architecture

The site is a single long-form page with stable anchor navigation.

### 5.1 Header

- Compact monogram/name mark.
- Links: Work, Expertise, About, Certificates, Contact.
- Persistent but visually quiet.
- Current section indication with both text/state and color.
- Mobile menu is keyboard-operable and does not obscure focus.

### 5.2 Hero — Neural Seed

Content:

- Mahmoud Ahmed Farouk
- AI Engineer
- “Machine Learning & Deep Learning · Computer Vision · Automation · Python”
- A short value statement focused on building AI systems that can be seen, tested, and used.
- Primary action: Explore selected work.
- Secondary actions: GitHub, LinkedIn, Email, Download CV.

Visual behavior:

- A small neural seed appears before the full 3D bundle is ready.
- Progressive WebGL enhancement replaces the static form without layout shift.
- The seed unfolds into the Neural Bloom as the visitor begins to scroll.
- Text remains normal server-rendered HTML.

### 5.3 Signal to Intelligence

A concise introduction to Mahmoud’s AI practice. Four capabilities appear as stages in one pipeline:

- Machine learning and model evaluation
- Deep learning and computer vision
- Retrieval and grounded generation
- Automation and product integration

The bloom’s petals align to the capability stages. Each stage uses a short evidence-based description, not a logo cloud.

### 5.4 Featured AI Work

Four featured case studies:

#### GenoScene

- Graduation project and primary capstone.
- Flutter client, Django REST/JWT/PostgreSQL application layer, FastAPI ML service.
- Uses tabular ML tools including scikit-learn, XGBoost, and LightGBM.
- Present predicted eye, hair, and skin traits as research-oriented probability distributions.
- State clearly that any portrait is illustrative and the system is not a definitive identity tool.
- Show real application screens and an architecture diagram.

#### OralVision

- Six-class oral disease image classification.
- Compare Custom CNN, ResNet50, and EfficientNet-B3.
- Repository-reported best result: 98.41% accuracy and 98.14% macro-F1 for EfficientNet-B3.
- Show the real FastAPI interface and model-comparison evidence.
- Avoid implying clinical deployment or diagnosis.

#### Corrective RAG System

- Document ingestion for PDF, DOCX, TXT, and CSV.
- Local `all-MiniLM-L6-v2` embeddings, ChromaDB retrieval, Gemini-based relevance evaluation, and one bounded query rewrite.
- Emphasize source attribution, correction path, deterministic tests, and grounded answers.
- Show the real Streamlit UI and a compact retrieval flow.

#### Realistic Face DCGAN

- TensorFlow/Keras DCGAN trained on 30,000 CelebA images.
- 64×64 generated faces over 30 epochs in the documented Colab environment.
- Repository-reported final losses: generator 2.2427 and discriminator 0.7276.
- Show generated samples as a model artifact, clearly labeled as synthetic faces.

Each case study includes:

- Problem
- Approach
- Mahmoud’s contribution based on repository evidence
- Stack
- Result or artifact
- Responsible-use note where relevant
- GitHub link

No live demo link should appear unless it is verified during implementation.

### 5.5 Software Systems

Two supporting projects show software development breadth:

#### POS System

Python, PySide6, SQLAlchemy, and SQLite desktop point-of-sale system. Highlight role-based access, inventory, payments, refunds, loyalty, reporting, and kitchen display workflows only where confirmed by the repository.

#### GenoScene Website

An earlier bilingual web prototype for the phenotype-prediction concept. Present it as product exploration and interface iteration, not as a duplicate flagship project.

### 5.6 Capabilities Constellation

An accessible visual map organized into:

- AI and machine learning
- Deep learning and computer vision
- Retrieval, LLM, and automation systems
- Python and backend engineering
- Product and interface implementation

The visual constellation is an enhancement. A semantic grouped list is always present.

### 5.7 Experience and education

Use a concise vertical timeline:

- Eram Group — experience beginning January 2025
- INSTANT Software Solutions — AI/ML trainee, July–December 2025
- Div Academy — AI/ML training, August–October 2024
- IT Gate Academy — CCNA training, August–October 2023
- Enactus — IT team, January–May 2023
- Modern Academy — Computer Science Graduate, Class of 2026

Exact titles and descriptions should be rewritten from the existing CV without adding unsupported responsibilities.

### 5.8 Certificates

Display three certificates:

1. INSTANT Software Solutions — AI Diploma, 170 hours, dated 1 December 2025.
2. Digitopia 2025 — Software Solutions and AI track, university students category.
3. Build with AI — Masr Edition, Google for Developers and ITI, 2025.

Each certificate has a thumbnail, accessible title, issuer, year, and open/download action. The original certificate remains available; the page uses a compressed derivative.

### 5.9 About and CV

- Short first-person or neutral professional biography in English.
- Position Software Development as the supporting ability that turns AI work into usable products.
- Public CV updated to use “Mahmoud Ahmed Farouk” and graduate status.
- Public CV excludes the phone number.
- Offer an accessible PDF for viewing/downloading; keep DOCX only if useful as a secondary format.

### 5.10 Contact

- Email, LinkedIn, and GitHub only.
- No public phone number.
- No contact form in the first release; direct channels reduce maintenance and spam.
- The Neural Bloom reconnects into one calm signal as the narrative closes.

## 6. Motion system

### Connected scroll behavior

One normalized page progress value drives the 3D scene state:

| Page phase | Neural Bloom state |
| --- | --- |
| Hero | Compact seed unfolds |
| Expertise | Petals separate into capability stages |
| Featured work | Petals become project anchors |
| Experience | Form compresses into a timeline signal |
| Contact | Signal reconnects into a quiet bloom |

DOM animations use the same section state but remain independent enough that delayed 3D loading cannot block the page.

### Motion principles

- Use transforms and opacity for most UI transitions.
- Avoid scroll hijacking, long pinned sections, and continuous parallax on body text.
- Do not start heavy animation before user interaction or canvas visibility.
- Cap spring overshoot and avoid constant ornamental motion.
- Pause or reduce animation when the canvas is offscreen or the tab is hidden.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Render a static 2D Neural Bloom.
- Remove scroll-linked transforms and spatial transitions.
- Keep direct fades only where they improve comprehension.
- Preserve the same content order and navigation.

## 7. Technical architecture

### Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion for interface and section progress
- Three.js
- React Three Fiber
- Drei, selectively
- Existing MDX/content approach or typed TypeScript data, chosen to minimize migration complexity

GSAP is not included initially. It may be added only if a specific approved sequence cannot be implemented reliably with Motion and native browser APIs.

### Rendering model

- Server Components render page structure, project content, metadata, and static fallback visuals.
- Client Components are limited to navigation state, interactive galleries, motion coordination, and the 3D scene.
- The WebGL canvas is dynamically imported and never blocks initial semantic content.
- Project imagery uses `next/image` with explicit dimensions and responsive sizes.

### Proposed component map

```text
app/
├── layout.tsx
├── page.tsx
├── sitemap.ts
├── robots.ts
└── opengraph-image or generated public asset

components/
├── shell/
│   ├── SiteHeader
│   ├── SectionFrame
│   └── SiteFooter
├── sections/
│   ├── Hero
│   ├── ExpertisePipeline
│   ├── FeaturedWork
│   ├── SoftwareSystems
│   ├── CapabilityConstellation
│   ├── ExperienceTimeline
│   ├── CertificateGallery
│   ├── AboutCV
│   └── Contact
├── work/
│   ├── ProjectCaseStudy
│   ├── ProjectEvidence
│   └── ResponsibleUseNote
├── motion/
│   ├── MotionProvider
│   ├── SectionProgress
│   └── ReducedMotionBoundary
└── scene/
    ├── NeuralBloomLoader
    ├── NeuralBloomScene
    ├── NeuralBloom2D
    └── SceneQualityController
```

### Data model

Store projects, certificates, capabilities, experience, and social links separately from presentation. Project entries should support:

- Slug
- Title and short description
- Category and featured priority
- Problem, approach, contribution, and outcome
- Technologies
- Metrics with source/context
- Evidence images
- Repository and optional verified demo
- Responsible-use note
- Accessibility alt text

This separation prevents factual updates from requiring component rewrites.

## 8. Asset plan

### Hero and decorative assets

- Neural Bloom is procedural geometry/material code.
- 2D fallback is a lightweight SVG or CSS-rendered derivative.
- No external environment map is required for the first release; use controlled procedural lighting or a very small local reflection asset only if visual testing proves it necessary.

### Project covers

For each project:

- Primary cover: 1600×1000 AVIF and WebP.
- Card derivative: 960×600 AVIF and WebP.
- Keep source PNG only when it is needed for future editing.
- Use real screenshots or code-generated compositions built around real screenshots.

Planned source evidence:

- GenoScene: actual Flutter screens and existing DNA-tree art only after visual and file-size review.
- OralVision: `oralvision-pearl-desktop.png`.
- Corrective RAG: `streamlit-home.png`.
- DCGAN: `final_faces.png`.
- POS System: actual dashboard/application screenshot.
- GenoScene Website: capture a new screenshot from the real local project; do not reuse the current random/watermarked banner.

### Certificates

- Long edge approximately 1600 px for web display.
- WebP/AVIF derivatives with originals retained for download.

### Social image

- Exactly one final Open Graph image at 1200×630.
- Derived from the approved Neural Bloom identity after the hero composition and copy are stable.

## 9. Responsive behavior

### Desktop

- Full Neural Bloom detail.
- Device pixel ratio capped at approximately 1.5.
- Content and scene can share the viewport without making text dependent on the canvas.

### Tablet

- Reduced bloom geometry and fewer signal particles.
- Case studies remain linear and readable; avoid horizontal scroll traps.

### Mobile

- Content-first single column.
- Lower geometry/particle count and lower render resolution.
- Project evidence appears as touch-friendly static galleries.
- Navigation and all actions meet minimum touch target sizes.

### Low-capability fallback

Use a 2D fallback when WebGL is unavailable or when heuristics such as reduced motion, data saver, low device memory, or repeated context loss indicate that the canvas would harm the experience. Do not rely on user-agent detection alone.

## 10. Performance requirements

Targets measured on the production build:

- LCP under 2.5 seconds on a representative mid-range mobile profile.
- CLS below 0.1.
- INP below 200 ms.
- Initial route should not require the Three.js bundle before meaningful content is visible.
- Canvas rendering should stop or become demand-driven when appropriate.
- No uncompressed multi-megabyte image should ship to the page.
- No blocking third-party font, analytics, or media request.

Implementation controls:

- Dynamic import for the scene.
- Responsive `next/image` sizing.
- AVIF/WebP derivatives.
- Font subsetting.
- Geometry and material reuse.
- Bounded particle counts.
- No default post-processing pipeline.
- Visibility-based rendering and tab pause.
- Bundle inspection after implementation.

## 11. Accessibility requirements

- Semantic headings in a logical hierarchy.
- A skip link and visible keyboard focus.
- All navigation and galleries operable by keyboard.
- Meaningful alt text for project evidence; decorative assets hidden from assistive technology.
- Certificate lightbox, if used, must manage focus, support Escape, and restore focus.
- No information communicated only through animation, position, or color.
- Reduced-motion experience tested as a primary mode.
- Text contrast meets WCAG AA.
- External links are clearly identified without disruptive behavior.

## 12. SEO and sharing

- Accurate title and description centered on AI engineering.
- Canonical URL configured at deployment.
- Open Graph and Twitter metadata.
- One 1200×630 social image.
- `sitemap.xml` and `robots.txt`.
- Structured data for `Person` and selected `CreativeWork`/`SoftwareSourceCode` items where appropriate.
- Descriptive project anchors and link text.
- Content rendered in HTML without requiring JavaScript.

## 13. Error and fallback states

- If the 3D chunk fails, keep the 2D Neural Bloom and all content.
- If a project image fails, show a branded text fallback with the project name.
- If a repository or demo URL is missing, omit the action instead of rendering a disabled link.
- If JavaScript is disabled, the entire portfolio remains readable and navigable as a linear document.
- External links use safe attributes and no private contact data is embedded.

## 14. Verification strategy

Before release:

- Lint, type-check, and production build.
- Unit tests for content/data validation and quality-selection logic.
- Component tests for navigation, project actions, certificate gallery, and reduced-motion behavior.
- Browser tests for desktop and mobile layout.
- Keyboard-only walkthrough.
- Automated accessibility scan followed by manual focus and reading-order review.
- Verify every GitHub, LinkedIn, email, certificate, and CV link.
- Test WebGL failure, reduced motion, small viewport, and slow-network fallbacks.
- Run Lighthouse or equivalent production performance checks.
- Confirm metadata, structured data, sitemap, robots, and social image.

## 15. Content safeguards

- Treat repository documentation as the source for technical claims.
- Mark repository-reported metrics with sufficient context.
- Do not describe research classifiers as clinical or forensic identification systems.
- Label all generated faces and illustrative portraits clearly.
- Do not publish the phone number.
- Do not claim employment responsibilities that are not supported by the supplied CV or repository history.

## 16. Definition of done

The portfolio is complete when:

- The approved Neural Bloom visual narrative is implemented with a 2D fallback.
- All six projects are represented accurately.
- All three certificates and the updated public CV are available.
- Public content uses the approved name, headline, graduate status, contact links, and English-only language.
- Performance, accessibility, responsive, and SEO verification passes at the agreed quality bar.
- The final production deployment is live and its links and metadata have been checked.
