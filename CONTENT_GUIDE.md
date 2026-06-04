# Content Guide

This portfolio is designed so you can add sections by copying one MDX file, editing frontmatter, and refreshing the site.

## تعديل سريع بالعربي

- بياناتك الأساسية: افتح `content/profile.mdx`.
- صورتك: حط الصورة في `public/images/` واكتب مسارها في `profileImage`.
- ملف الـCV: بدله من `public/docs/mahmoud-farok-resume.docx` لو عايز زر التحميل ينزل نسخة أحدث.
- مشروع جديد: انسخ `content/_templates/project.mdx` إلى `content/projects/project-name.mdx`.
- شهادة جديدة: انسخ `content/_templates/certificate.mdx` إلى `content/certificates/certificate-name.mdx`.
- خبرة أو تدريب جديد: انسخ `content/_templates/experience.mdx` إلى `content/experience/company-role.mdx`.
- بعد أي تعديل شغل `npm run dev` وافتح `http://localhost:3000`.
- لو لقيت `draft: true` في ملف جديد، غيرها إلى `draft: false` أو امسح السطر عشان يظهر في الموقع.

## Profile

Edit `content/profile.mdx`.

Important fields:

- `name`
- `headline`
- `location`
- `email`
- `phone`
- `availability`
- `profileImage`
- `stats`
- `focus`
- `education`

To use a real photo, place it in `public/images/`, then update:

```yaml
profileImage: /images/your-photo.jpg
```

## Add A Project

Copy:

```text
content/_templates/project.mdx
```

Paste it into:

```text
content/projects/my-project-name.mdx
```

Then edit:

```yaml
title: Project Title
summary: One clear sentence about the value.
role: Your role
year: 2026
stack:
  - Next.js
featured: true
order: 10
```

Keep `summary` short. Use the body for the case study: problem, approach, result.

## Add A Certificate

Copy:

```text
content/_templates/certificate.mdx
```

Paste it into:

```text
content/certificates/certificate-name.mdx
```

Then fill:

```yaml
title: Certificate Title
issuer: Issuer Name
date: Jan 2026
credentialUrl: https://example.com/credential
image: /images/certificates/certificate-name.png
draft: false
order: 10
```

If you do not have a credential URL yet, remove `credentialUrl`.
Put the certificate image file in `public/images/certificates/` first. Example:

```text
public/images/certificates/instant-ai.png
```

Then use:

```yaml
image: /images/certificates/instant-ai.png
```

## Add Experience Or Training

Copy:

```text
content/_templates/experience.mdx
```

Paste it into:

```text
content/experience/company-role.mdx
```

Accepted `type` values:

- `Work`
- `Training`
- `Student Activity`

## Recommended Portfolio Sections

The current site includes the sections that matter most for a developer portfolio:

- Hero: role, contact, location, and availability.
- About: short positioning statement.
- Projects: case-study-ready cards.
- Skills: grouped by practical capability.
- Certificates: empty until real certificates are added.
- Experience: work, training, and student activity timeline.
- Education: school and focus areas.
- Contact: email and phone call-to-action.
