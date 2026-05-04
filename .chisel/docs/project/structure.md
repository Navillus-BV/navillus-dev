---
title: Project Structure
created_at: 2026-05-04T00:00:00Z
tags:
- project
- structure
- layout
order: 3
---

Repository layout, with the role of each directory and the most
important files inside it.

### Top level

```
navillus-dev/
├── astro.config.mjs        # Astro config (site URL, integrations, remark)
├── netlify.toml            # Build command, plugins, redirects
├── package.json            # Scripts + deps; type: module
├── tsconfig.json           # extends astro/tsconfigs/strictest
├── remark-reading-time.mjs # Custom remark plugin (adds minutesRead)
├── .nvmrc                  # Node 22
├── public/                 # Static assets served as-is (favicon, manifest…)
├── src/                    # All application source
├── _cache/                 # Cached by netlify-plugin-cache-folder
├── dist/                   # Build output (gitignored)
└── .chisel/                # Chisel docs/specs workspace (this tool)
```

### `src/`

```
src/
├── content.config.ts       # Zod schemas + collection definitions
├── env.d.ts                # Astro client types
├── assets/                 # Imported images (processed by Astro)
├── components/             # Reusable .astro components
│   └── blocks/             # Block-system components (UIBlock, Badges*, Features*, Contact*)
├── content/                # Markdown/JSON content (pages, blog, authors)
├── data/                   # Static config (site, navigation) as JSON + .ts exporter
├── layouts/                # Page-level layouts (Page, Hero, Legal, Post)
├── pages/                  # File-based routes
│   ├── index.astro         # Home — renders pages/home content via Hero layout
│   ├── [slug].astro        # Catch-all page route (legal pages, etc.)
│   ├── blog/
│   │   ├── [...page].astro # Paginated blog index (25 per page)
│   │   └── [slug].astro    # Single blog post
│   ├── feed/blog.xml.ts    # RSS feed endpoint
│   └── tags/[tag]/         # Tag archive routes
├── styles/
│   └── theme.css           # chisel.css imports + design tokens + theme overrides
└── utils/
    ├── dates.ts            # formatDate
    ├── mentions.js         # WebMentions fetching/filtering
    └── uniq.ts             # Set-based dedupe helper
```

### Content collections (`src/content/`)

- `pages/` — site pages. The `home.md` entry is the canonical example
  of the block-driven `hero` page; `privacy.md` and friends use the
  `legal` type.
- `blog/` — one Markdown file per post. Slug = filename. Author is a
  collection reference (`reference("authors")`).
- `authors/` — JSON files per author (e.g. `tony-sull.json`).

### Component layering

- **Layouts** (`src/layouts/`) own `<html>`, fonts, theme script, SEO,
  navigation, and footer. `Post.astro` extends `Page.astro` and adds
  blog-specific UI (microformats, WebMentions, share).
- **Components** (`src/components/`) are leaf UI pieces. The block
  system lives under `components/blocks/` and is dispatched by
  `components/Block.astro` based on the block's `type` discriminant.
- **`Show.astro`** is the codebase's standard conditional-render
  primitive — prefer it over inline ternaries.

### Routing summary

| Route                | File                                    |
|----------------------|-----------------------------------------|
| `/`                  | `pages/index.astro` (renders `pages/home`) |
| `/<slug>`            | `pages/[slug].astro` (legal pages)      |
| `/blog`, `/blog/N`   | `pages/blog/[...page].astro`            |
| `/blog/<slug>`       | `pages/blog/[slug].astro`               |
| `/tags/<tag>`        | `pages/tags/[tag]/...`                  |
| `/feed/blog.xml`     | `pages/feed/blog.xml.ts`                |
| `/sitemap-index.xml` | `@astrojs/sitemap` integration          |

### `.chisel/`

Chisel's local-first knowledge base for this repo:

- `docs/` — long-lived project documentation (this folder).
- `specs/` — lifecycle-aware feature specs (`active/`, `shipped/`,
  `archived/`).
- `index.db` — SQLite search index (gitignored).
- `PROMPT.md` — instructions for AI assistants working in the repo.

Use `chisel docs --machine` and `chisel context create <query>` to feed
this knowledge base into LLM workflows.
