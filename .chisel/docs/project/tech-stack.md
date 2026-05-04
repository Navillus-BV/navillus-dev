---
title: Tech Stack
created_at: 2026-05-04T00:00:00Z
tags:
- project
- stack
- astro
- typescript
order: 1
---

The site (`navillus.dev`) is a static, content-driven marketing + blog site
built with **Astro**. There is no backend service — everything is rendered
to static HTML/CSS/JS at build time and served from Netlify's CDN.

### Runtime & Build

- **Node.js**: pinned to `22` via `.nvmrc`.
- **Package manager**: `npm` (single `package-lock.json`, no workspaces).
- **Module type**: ESM (`"type": "module"` in `package.json`).
- **Astro**: `^6.2.2`. Default static output. Configured in
  `astro.config.mjs` with `site: "https://navillus.dev"`.
- **TypeScript**: `^6.0.3`, extending `astro/tsconfigs/strictest`. All
  application code is typed; non-typed `.js` files are limited to small
  utilities (`src/utils/mentions.js`) and the remark plugin
  (`remark-reading-time.mjs`).

### Astro Integrations & Plugins

- `@astrojs/sitemap` — generates `/sitemap-index.xml`, linked from the
  page `<head>`.
- `@astrojs/rss` — used by `src/pages/feed/blog.xml.ts` to emit an RSS
  feed for the blog collection.
- `@astrojs/check` — type-checks the project as part of `npm run build`
  (`astro check && astro build`).
- `@astrojs/compiler-rs` — listed as an optional dependency for the
  faster Rust-based Astro compiler.
- `remark-reading-time.mjs` — local remark plugin that injects
  `minutesRead` into Markdown frontmatter using `reading-time` and
  `mdast-util-to-string`.

### Content & Data

- **Content Collections**: defined in `src/content.config.ts` with
  `defineCollection` + Zod schemas. Three collections:
  - `pages` (Markdown, glob `src/content/pages/**/*.md`) — supports
    `hero`, `legal`, and base `page` variants via discriminated unions.
  - `blog` (Markdown, glob `src/content/blog/**/*.md`) — references the
    `authors` collection.
  - `authors` (JSON, glob `src/content/authors/**/*.json`).
- **Block schemas**: pages can embed an array of typed `blocks`
  (`badges`, `contact`, `features`) — each with its own Zod schema and
  exported TypeScript type.
- **Static data**: site/navigation config lives in `src/data/` as
  `*.json` plus a thin `*.ts` exporter that casts to a typed shape
  (`SiteSettings`, `NavigationSettings`).
- **Markdown rendering**: `marked` is used inside the RSS feed to
  inline-render post bodies as HTML.

### Styling

- **CSS framework**: [`chisel.css`](https://www.npmjs.com/package/chisel.css)
  (note: this is the CSS framework, not the `chisel` CLI used for
  documentation). Imported in `src/styles/theme.css` along with
  `chisel-prism.css` for code blocks.
- **Design tokens**: CSS custom properties — `--chisel-*` variables for
  the framework's colors/typography, plus project-specific
  `--spacer-*`, `--shadow-*`, and brand colors (`--color-orange`,
  `--color-black`).
- **Theming**: light/dark mode via `data-chisel-theme` attribute on
  `<html>`. Toggled by `ThemeToggle.astro`, persisted to
  `localStorage`, with an inline pre-paint script in `Page.astro` to
  avoid FOUC.
- **Fonts**: Poppins, self-hosted via `@fontsource/poppins` (400/500/700)
  and preloaded as `woff2`.
- **Component styles**: scoped `<style>` blocks inside each `.astro`
  component, using nested CSS and `var(--chisel-*)` / `var(--spacer-*)`
  tokens.

### Hosting & Deployment

- **Netlify** — `netlify.toml` declares `npm run build` → `dist/`.
- **Netlify plugins**:
  - `netlify-plugin-a11y` — accessibility audit on each deploy.
  - `netlify-plugin-cache-folder` — caches `_cache/` between builds.
  - `@netlify/plugin-lighthouse` — Lighthouse run on each deploy.
- **Redirects**: `navillus.nl` → `navillus.dev` (301, force).

### IndieWeb / Social

- **WebMentions**: collected and rendered via `src/utils/mentions.js`
  and the `WebMentions*` components. Posts use microformats2
  (`h-entry`, `p-name`, `p-summary`, `dt-published`, `e-content`,
  `h-card`).
- **Twitter share / embeds**: `TwitterShare.astro`, `tweet_id` on
  blog posts.
- **RSS**: `/feed/blog.xml` referenced from the page `<head>`.
- **Open Graph + Twitter Cards**: handled in `SEO.astro`.

### Local development

- `npm run dev` — Astro dev server.
- `npm run build` — `astro check && astro build`.
- `npm run preview` — serve `dist/` locally.
