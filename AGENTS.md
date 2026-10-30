<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Yousuf

Yousuf is an elegant AI Engineer portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. Use Motion for animations and Radix UI when accessible interactive components are needed; add dependencies only when justified.

## Engineering

- Prefer Server Components by default. Add `"use client"` only where interactivity, client hooks, or browser APIs require it, keeping the client boundary small.
- Write readable, strictly typed TypeScript; avoid `any` and unsafe type assertions.
- Keep components small, focused, and reusable without unnecessary abstractions.
- Use semantic HTML and maintain keyboard accessibility, visible focus states, and appropriate accessible names.
- Respect `prefers-reduced-motion`; reduce or disable nonessential movement.
- Use responsive, mobile-first Tailwind styling.
- Avoid unnecessary dependencies; prefer existing tools and native platform features.
- Never invent project achievements or professional experience. Ask for missing facts or use clearly labeled placeholders.
- Run relevant checks after modifications: lint and build for application changes, plus existing tests when applicable. For documentation-only changes, review the diff. Report any checks that could not run.
- Explain important React and Next.js concepts in simple language when discussing changes with the user.

## Design

- Aim for premium editorial minimalism with generous whitespace and a clear typographic hierarchy.
- Use porcelain-white backgrounds, graphite typography, and muted cobalt and champagne accents; maintain readable contrast.
- Keep animations sophisticated, restrained, and purposeful.
- Avoid generic dashboard or SaaS template styling.
