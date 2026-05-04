# Chisel Project: navillus-dev

This project uses Chisel for documentation and specs.

## Structure
- Docs: `.chisel/docs/` (Markdown)
- Specs: `.chisel/specs/` (Markdown with YAML frontmatter, organized by lifecycle)
  - `.chisel/specs/active/` — drafts, ready, and in-progress specs
  - `.chisel/specs/shipped/` — completed specs
  - `.chisel/specs/archived/` — superseded or abandoned specs

## Guidelines
When performing tasks in this repo, you can use `chisel docs` and `chisel spec` with the `--machine` flag to inspect and update the project state efficiently.

Use `chisel context create <query>` to gather relevant docs and specs as structured context.