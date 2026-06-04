# Mahmoud Farok Portfolio

A modern, animated, content-driven portfolio built with Next.js, React, TypeScript, Tailwind CSS, Motion, and MDX files.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript 6
- Tailwind CSS 4
- Motion for React
- MDX content files with frontmatter

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Content

Edit portfolio content in `content/`:

- `content/profile.mdx` updates the hero, about text, contact details, and education.
- `content/projects/*.mdx` adds or edits project cards.
- `content/certificates/*.mdx` adds certificates.
- `content/experience/*.mdx` updates the timeline.
- `content/_templates/*.mdx` contains copy/paste templates.

Read `CONTENT_GUIDE.md` before adding new sections.

## ECC Reference

ECC is cloned locally into `.tools/ECC` and ignored by Git. It is used only as a local reference for frontend patterns, accessibility, Next.js/Turbopack guidance, and Markdown workflow ideas. It is not installed globally and does not change machine-level tool configuration.
