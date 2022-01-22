---
title: Converting our site to Astro
description: Spoiler - you probably don't need a kitchen sink framework.
social_image: '/uploads/2021-07-20-converting-navillus-to-astro.jpg'
date: '2021-07-20T17:36:12Z'
tags:
  - astro
permalink: '/blog/converting-navillus-to-astro'
published: true
last_modified_at: '2021-07-20T00:00:00Z'
blocks: []
tweet_id: '1417535981058764809'
author: src/data/authors/tony-sull.json
---

Not too long ago, the Navillus site was rewritten from the ground up in [Astro](https://astro.build). Since then we've had quite a bit of interest in why we jumped to Astro, how it went, and what we learned. I'll do my best to answer the common questions here, but feel free to reach out on [Twitter](https://twitter.com/navillus_dev) if we missed anything!

**tl;dr;** Our homepage makes fewer requests (10 vs. 21), is smaller (77kB vs. 123kB), and our JavaScript footprint went down from 31kB to a whopping 2kB!

## Why we moved to Astro

A huge majority of the web is static content, and our site is no different. There are exactly two components with any type of client-side interactivity, the mobile menu and our theme toggle. As you might expect, those components aren't exactly complicated and can be built with only a few lines of JavaScript.

## Migrating from SvelteKit

Our site was previously written in [SvelteKit](https://kit.svelte.dev) and, especially for being it considered beta, we were very happy with SvelteKit. The fact is, though, that webapp frameworks like SvelteKit, [Next.js](https://nextjs.org/), and [Nuxt.js](https://nuxtjs.org/) are focused on building highly interactive frontends rather than mostly static sites.

Don't get me wrong, SvelteKit earned its place at the top of my list when building large, dynamic webapps. But for most projects, I will happily build with Astro and sprinkle in [Svelte](https://svelte.dev) components when needed.

### What did it take to change?

Surprisingly, not that much! Most of the Svelte components we had were only used for layout purposes, and because Svelte sticks so closely to plain old HTML/CSS/JS it was trivial to convert most of the Svelte components to Astro components.

The main change will be related to conditional rendering syntax, like hiding/showing an element or looping over an array of data. For example,

In Svelte...

```html
{#if open} ... {/if}

<ul>
  {#each items as item}
  <li>{item}</li>
  {/each}
</ul>
```

becomes...

```astro
{open && (
  ...
)}

{items.map((item) => <li>{item}</li>)}
```

Coming from Svelte this feels a little too React-y for my taste, but it is really handy to be able to use JavaScript right in the template. I haven't actually tried this yet, but I assume you could `sort()` or `filter()` the array right in your template!

### What didn't work?

Nothing! Our site is pretty straight forward with little more than static homepage content and a blog, those really are table stakes for any static site generator.

When it came time to port over the mobile menu and theme toggle, we decided to use the Svelte components as-is initially. That's the real benefit of Astro, static site generation without having to give up the component framework when needed. Note that we did recently move those components to Astro as well, helping to bring our JS size below 2kB.

### What about server routes?

This site wasn't using any of SvelteKit's [server endpoints](https://kit.svelte.dev/docs#routing-endpoints), but it is important to remember that Astro is currently focused on static site generation.

Astro doesn't build any kind of server but if you happen to deploy to [Netlify](https://netlify.com), their [Functions](https://www.netlify.com/products/functions/) product is a great fit for Astro. Subscribe to our [RSS feed](https://navillus.dev/feed/blog.xml) so you don't miss an upcoming post adding Netlify Functions to populate our site's [web mentions](https://webmention.io)!

## What did we learn?

Working with Astro was refreshingly simple. React, Svelte, Vue, etc. have their place in modern web development but it's important to remember that they aren't always necessary. Our theme toggle does nothing more than add/remove a class from the document element, is that really enough to warrant another dependency and ~9kB in extra JS?

Astro is still in beta! The framework has been moving extremely fast, a quick glance at the [changelog](https://github.com/snowpackjs/astro/blob/main/packages/astro/CHANGELOG.md) shows 13 releases so far in the month of July. A few APIs have had small changes and the Collections API is in the middle of a [refactor](https://github.com/snowpackjs/astro/pull/703), don't be surprised if you occasionally have to make a few updates to keep up with the latest Astro release.

## Conclusion

It's easy to skip right past the simple solution in software projects. Full-featured frameworks can be a huge time saver when starting a dynamic web application, but if all you need is a marketing site you may just be better off with a simple statically built site powered by Astro!

Have more questions that we missed here? Reach out on [Twitter](https://twitter.com/navillus_dev)!
