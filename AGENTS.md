<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mahmoud Portfolio Rules

This project is a content-driven personal portfolio for Mahmoud Farok.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion for React
- MDX files under `content/`

## Content Editing

- Add projects by copying `content/_templates/project.mdx` into `content/projects/`.
- Add certificates by copying `content/_templates/certificate.mdx` into `content/certificates/`.
- Add timeline items by copying `content/_templates/experience.mdx` into `content/experience/`.
- Do not claim certificates that are not present as real content files.
- Keep project summaries short and put longer case-study writing in the MDX body.

## ECC Reference

ECC is cloned at `.tools/ECC` for local reference only and is ignored by Git. Use these ideas from ECC when modifying the site:

- Prefer composable React components.
- Keep interactive elements semantic and keyboard-accessible.
- Respect reduced-motion preferences.
- Use Next.js 16 default Turbopack scripts unless there is a documented issue.
- Avoid generic template-looking UI; preserve the intentional editorial portfolio style.

## Verification

Run these before handing off meaningful changes:

```bash
npm run lint
npm run typecheck
npm run build
```
