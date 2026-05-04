---
title: Coding Standards
created_at: 2026-05-04T00:00:00Z
tags:
- project
- standards
- conventions
- typescript
- astro
order: 2
---

Conventions observed across the codebase. Match these when adding new
code so the project stays consistent.

### TypeScript

- `tsconfig.json` extends `astro/tsconfigs/strictest`. Don't loosen it.
- Prefer typed `.ts` / `.astro` over `.js` / `.mjs`. Plain JS is reserved
  for the remark plugin (`remark-reading-time.mjs`) and the WebMentions
  helper (`src/utils/mentions.js`); new code should be TypeScript.
- Define and **export** a `Props` (or domain-specific) type alongside
  every component:
  ```ts
  export type Props = SEOProps & { /* … */ };
  ```
- Cast `Astro.props` to the prop type at the top of the frontmatter:
  `const { … } = Astro.props as Props;`.
- Use Zod (`astro/zod`) for any new content schema; export the inferred
  type with `z.infer<typeof schema>` and re-use it in components instead
  of redeclaring shapes.
- Use discriminated unions on a literal `type` field for variants
  (see `Block`, `Page` in `src/content.config.ts`); guard with custom
  type predicates (`isBadgesBlock`, `isContactBlock`, …) when narrowing.
- Use `satisfies GetStaticPaths` on dynamic-route exports rather than
  annotating with `: GetStaticPaths` directly.

### Astro components

- File naming: `PascalCase.astro` for components and layouts; lowercase
  filenames for routed pages (`index.astro`, `[slug].astro`,
  `[...page].astro`).
- One component per file. Keep the frontmatter (`---` script block)
  small — push logic into `src/utils/` or `src/data/` when it grows.
- Prefer **composition over conditionals**: use the existing `Show`
  component (`<Show when={…}>…</Show>`) for boolean rendering rather
  than ternaries with `null`.
- Block components follow a layered pattern:
  - `UIBlock.astro` — base wrapper (section, container, title/subtitle).
  - `<Variant>Block.astro` — variant wrapper that spreads its props
    into `UIBlock` and renders variant-specific children.
  - `<Variant>BlockItem.astro` / `<Variant>BlockGroup.astro` — leaves.
- Mirror this layering when introducing a new block type, and register
  the new schema in `src/content.config.ts` plus the dispatch in
  `src/components/Block.astro`.

### Styling

- Use scoped `<style>` inside `.astro` components for component-local
  CSS. Reach for `:global(...)` only when targeting slotted/Markdown
  output.
- Compose with **CSS custom properties** from `chisel.css`
  (`--chisel-primary`, `--chisel-neutral-*`, `--chisel-h1`…`--chisel-h6`)
  and the project tokens defined in `src/styles/theme.css`
  (`--spacer-tiny`…`--spacer-xl`, `--shadow-*`). Do not hard-code colors,
  spacing, or font sizes that already have a token.
- Use nested CSS (`& selector { … }`) and `@media` queries inside
  blocks — the codebase relies on the modern CSS Nesting syntax.
- Mobile-first breakpoints in use: `480px`, `640px`, `768px`, `1024px`.
- Theme overrides go under `:root[data-chisel-theme="dark"]` in
  `theme.css`.

### Accessibility

- Maintain the `Skip to content` link in `Page.astro` and the `#main`
  landmark.
- Use `sr-only` / `sr-only-focusable` (provided by `chisel.css`) for
  visually hidden labels — see `Footer.astro`, `Navigation.astro`.
- Always provide `alt` text on images; `social_image` schema requires
  both `src` and `alt`.
- `aria-current={pathname === href}` for active nav links.
- `netlify-plugin-a11y` runs on every deploy — fix issues it surfaces
  rather than ignoring them.

### Content authoring

- Pages live in `src/content/pages/`, blog posts in `src/content/blog/`,
  authors in `src/content/authors/`. The slug is the filename.
- Required frontmatter for blog posts (see `blogPostSchema`):
  - `title`, `description`, `social_image: { src, alt }`, `date`,
    `author` (reference to an author file).
  - Optional: `tags`, `tweet_id`, `last_modified_at`, `published`
    (defaults `true`).
- Pages with hero/blocks use the `hero` or `legal` `type` — see
  `home.md` for the canonical block-driven layout.
- Reference assets via relative paths (`../../assets/uploads/...`) so
  Astro's image pipeline can process them.

### Routing

- File-based routing in `src/pages/`.
- Dynamic routes use Astro patterns: `[slug].astro` for single params,
  `[...page].astro` for paginated routes.
- `getStaticPaths` always returns `{ params, props }` and uses
  `satisfies GetStaticPaths`.
- Filter blog posts by `data.published` and sort by `data.date` desc
  before paginating (see `src/pages/blog/[...page].astro`).

### Data & utilities

- Static config goes in `src/data/` as `*.json` + a typed `*.ts`
  exporter. Don't read JSON directly from components — import from the
  exporter so the type travels with the data.
- Small pure helpers belong in `src/utils/` (`dates.ts`, `uniq.ts`).
  Keep them dependency-free where possible.

### Build / CI expectations

- `npm run build` runs `astro check` first — type errors fail the
  build. Don't merge work that doesn't pass `astro check`.
- Treat Lighthouse and a11y plugin output on Netlify previews as
  blocking signal for merges.
