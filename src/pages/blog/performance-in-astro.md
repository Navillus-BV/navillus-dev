---
layout: '../../layouts/Post.astro'
title: Performance wins with Astro
draft: true
description: Does your site really need all that JS?
author: tony-sull
image: posts/2021-07-19-performance-in-astro.jpg
published_date: 2021-07-19
tags:
  - astro
  - svelte
---

Every frontend framework has its benefits, but it can be easy to forget how nice it is to stick with plain old JavaScript. [Astro](https://astro.build) already supports many of the most popular frameworks and is the list [is growing fast](https://github.com/snowpackjs/astro/issues/109), but when is it worth skipping the frameworks?

**tl;dr;** The [Navillus site](https://navillus.dev) got even more performant after replacing the Svelte components with basic JS implementations instead. Check out the [performance comparison](https://webpagetest.org/video/compare.php?tests=210719_AiDcC7_154e0b9735ff2c39113c0037ec7b27ad,210719_BiDcV0_7a166dcdbec64c8294ad9c2bb66e9544) or jump right into the changes on [Github](https://github.com/Navillus-BV/navillus-dev/commit/728d036b72043f3d6a2e084228b1ae75c0efbfa8).

## Why replace the Svelte components?

I probably pay a little too much attention to my browser's devtools! This was more of an experiment than anything else, [Svelte](https://svelte.dev) components compile to very optimized JavaScript and can really save your butt when it comes to avoiding synchronization bugs in complex components.

This site only had two interactive components though, the mobile menu and the dark/light theme selector.
