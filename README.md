# Wedalla Event Planner

Wedalla Event Planner is a static event planning website built with Vite, React, TypeScript, Tailwind CSS, React Router, and a Supabase client scaffold.

## Local Setup

```sh
npm install
npm run dev
```

## Validation

```sh
npm run lint
npm test
npm run build
```

## Production Build

```sh
npm run build
```

The production files are generated in `dist/`.

## cPanel Static Deployment

Run `npm run build`, then upload the contents of `dist/` to the target cPanel public web directory, such as `public_html`.

## Backend Status

This project is currently a static Vite app. A Supabase client scaffold exists, but backend features, API routes, database tables, and contact form persistence are not implemented yet.
