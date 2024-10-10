// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://navillus.dev",
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
