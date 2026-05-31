# AGENTS.md

## Project
Wedalla Event Planner website.
Stack: Vite, React, TypeScript, Tailwind, React Router, Supabase client.

## Rules
- Use npm only.
- Keep changes small and scoped.
- Do not overbuild.
- Do not add dependencies without approval.
- Do not commit or push unless explicitly asked.
- Do not edit `.env` or commit secrets.
- This is currently a static Vite app, not a real backend app.

## Validation
After edits, report:
- npm run lint
- npm test
- npm run build

## Priorities
1. Fix README and project documentation.
2. Fix metadata/title/SEO mismatch.
3. Add `.env.example`.
4. Add deployment notes for Vite/cPanel.
5. Fix fake contact form later.
6. Only then consider Supabase/backend work.

## Review guidelines
Flag:
- fake backend claims
- fake forms
- unsafe environment handling
- deployment assumptions
- unnecessary dependencies
- branding mismatch
