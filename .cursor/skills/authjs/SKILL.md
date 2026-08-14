---
name: authjs
description: Current Auth.js authentication guidance for Next.js applications. Use when implementing login, sessions, OAuth, protected routes, callbacks, adapters, or authorization.
---

# Auth.js Skill

## Source of truth

Official documentation:

https://authjs.dev/

Use the current Auth.js documentation rather than older NextAuth.js tutorials.

## Rules

- Prefer current Auth.js APIs.
- Do not blindly copy NextAuth v3/v4 tutorials.
- Verify configuration against the current Auth.js documentation.
- Understand whether authentication logic belongs on the server or client.
- Protect server resources on the server.
- Do not expose secrets to the client.
- Follow current Next.js App Router authentication patterns.
- Check current documentation before implementing callbacks, adapters, providers, sessions, or authorization.

## Next.js authentication

Also consult:

https://nextjs.org/docs/app/guides/authentication

When Next.js and Auth.js documentation differ, determine which behavior applies to the installed package versions in package.json.
