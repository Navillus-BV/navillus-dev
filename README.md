# navillus.dev

Source for [navillus.dev](https://navillus.dev) — Navillus BV's marketing
site and engineering blog. Built with [Astro](https://astro.build) and
hosted on Netlify.

## Local development

Requires Node 22 (`.nvmrc`).

```sh
npm install
npm run dev      # dev server at localhost:4321
npm run build    # astro check && astro build → dist/
npm run preview  # preview the build
```

## Project documentation

Long-lived project docs live in `.chisel/docs/`, managed via the
[`chisel`](https://chisel.build) CLI. Start here:

- [`project/tech-stack.md`](./.chisel/docs/project/tech-stack.md) — frameworks, integrations, hosting
- [`project/coding-standards.md`](./.chisel/docs/project/coding-standards.md) — TypeScript, Astro, CSS, accessibility conventions
- [`project/structure.md`](./.chisel/docs/project/structure.md) — directory layout and routing map

Query them with `chisel docs overview` or pull targeted LLM context with
`chisel context create "<topic>"`.

## Adding content

- **Blog posts** — `src/content/blog/<slug>.md`. Frontmatter schema in
  `src/content.config.ts`; copy an existing post as a template.
- **Authors** — `src/content/authors/<id>.json`.
- **Static pages** — `src/content/pages/<slug>.md`.
