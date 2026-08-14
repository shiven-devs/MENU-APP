---
name: nextjs
description: Current Next.js development guidance. Use when creating, modifying, debugging, or reviewing Next.js applications, especially Next.js 16 App Router projects.
---

# Next.js Skill

## Source of truth

Use the official Next.js documentation as the primary source:

https://nextjs.org/docs

Current target version: Next.js 16.

Prefer current Next.js 16 App Router patterns.

## Important rules

- Prefer App Router over Pages Router unless the existing project uses Pages Router.
- Follow current Next.js 16 APIs and conventions.
- Do not use deprecated APIs when a current replacement exists.
- Check the official documentation when an API may have changed between versions.
- Prefer Server Components by default.
- Use `"use client"` only when client-side functionality is actually required.
- Follow current caching and data-fetching behavior.
- Use Server Actions where appropriate.
- Use Route Handlers when an HTTP endpoint is actually required.
- Follow current Next.js metadata conventions.
- Follow current Next.js authentication/proxy conventions.

## Version awareness

Never assume that an old Next.js tutorial is still correct.

If there is a conflict between training knowledge and the current official documentation, prefer the official documentation.

## Documentation

Next.js:
https://nextjs.org/docs

Next.js authentication:
https://nextjs.org/docs/app/guides/authentication

Next.js project structure:
https://nextjs.org/docs/app/getting-started/project-structure
