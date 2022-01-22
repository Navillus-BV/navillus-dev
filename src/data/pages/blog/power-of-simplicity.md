---
title: The power of simplicity
description:
  It's easy to get swept up in the latest libraries and platforms, but
  don't underestimate the time savings of "boring" tech.
social_image: '/uploads/2021-08-07-power-of-simplicity.jpg'
date: '2021-08-07T17:42:35Z'
tags:
  - jamstack
  - intro
permalink: '/blog/power-of-simplicity'
published: true
last_modified_at: ''
blocks: []
tweet_id: '1424057461368135681'
author: src/data/authors/tony-sull.json
---

Our last post highlighted the benefits of using [Astro](https://astro.build) and [Forestry CMS](https://forestry.io) (catch up [here](/blog/astro-plus-forestry-revisited) in case you missed it). Forestry actually shared our post with a really important point that I thought was worth digging into with a proper blog post.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The beauty of embracing open formats like Markdown and JSON on top of Git is that a CMS you designed more than 5 years ago, works perfectly with the latest modern web tooling.<br><br>Now go check <a href="https://twitter.com/astrodotbuild?ref_src=twsrc%5Etfw">@astrodotbuild</a> to ship faster websites 🚀 <a href="https://t.co/0o6OgCfkgx">https://t.co/0o6OgCfkgx</a></p>&mdash; Forestry CMS (@forestryio) <a href="https://twitter.com/forestryio/status/1423251438063521792?ref_src=twsrc%5Etfw">August 5, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Follow [@forestryio](https://twitter.com/forestryio) on Twitter if you don't already! Their git-based CMS tools are a huge win for any Jamstack project and should you have any questions or issues, their team is extremely responsive and helpful.

**tl;dr;** The web development landscape is constantly in flux. It's easy to see the latest tools, languages, and frameworks get hyped on your favorite blogs and podcasts, but at the end of the day you probably need to build quality sites that can be easily maintained for years. More often than not, the boring tools make your life easier in the long run!

## A bit of history

It wasn't so long ago that sites were edited by handed - good old fashioned HTML,CSS, and (maybe) JS. A site contained more `<marquee>`s than pages, [RIP marquee!](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee), and the `querySelector` wasn't a thing.

Browsers are still fundamentally the same today. Yes they are much bigger and feature packed, but at the end of the day a browser takes markup in the form of HTML, styles in the form of CSS, and JavaScript for interactivity. We have more APIs to play with, and more caching problems to manage, but at the end of the day it's the development workflow that has really complicated.

### Modern web development

Jumping ahead a few years (or 20) and now its not uncommon to start a project by deciding on the 5+ tools and platforms you will be bolting together. Do you want static site generation (SSG), server-side rendering (SSR), or client-side rendering(CSR)? Are you standing up and maintaining a backend server, or jumping on the serverless backend? Will plain CSS do the trick, or is SASS/SCSS/LESS your preferred approach? What about this CSS in JS and styled components madness?!?

Oh wait, you also need to host it somewhere. Does the project need continuous integration (CI) with automated testing, automated deployments, staging environments, etc? Better schedule another few days to decide on those tools, setup accounts, and bootstrap the basics together before you start coding!

## Does it have to be so complicated?

No! Sure, all these tools and processes were created for good reason. CI can save a huge amount of time. Transpilers, build tools, and linters can help catch common mistakes and enforce team coding standards. Frontend frameworks can really be a lifesaver, especially if you need to build interfaces with complex interactivity and state management.

But all these advancements can turn into a real nightmare, too. Ever tried onboarding a new hire that is an experienced web developer but not familiar with the latest React trends like styled components or hooks? Is the time spent ramping up on these abstractions really worth the effort for a simple marketing site or statically hosted e-commerce store?

### Long-term value

The tech stack you chose can be a much larger commitment than it first seems to be. I would be very surprised if react was no longer used a couple years down the road, but what about the 15 libraries you pull in to that react app?

If a project is built on an _everything but the kitchen sink™_ app platform like [Nuxt.js](https://nuxtjs.org/), [Next.js](https://nextjs.org/), or [SvelteKit](https://kit.svelte.dev) can really let you hit the ground running, but will they still be supported a few years down the road? Will developers still be excited to work with them, or will it be the butt of too many developers' jokes like WordPress?

## Keep it simple, stupid

Back to the entire reason we're here, sticking with "boring" tech may not be such a bad idea. The [JSON](https://en.wikipedia.org/wiki/JSON) spec is around 20 years old, [git](https://en.wikipedia.org/wiki/Git) is 16 years old, and [markdown](https://en.wikipedia.org/wiki/Markdown) is 17 years old. Though the HTML/CSS/JS standards are a constant work in progress they go back as far as [1993](https://en.wikipedia.org/wiki/HTML) (ok, 1995 for [JavaScript](https://en.wikipedia.org/wiki/JavaScript)).

Even better, these are all open standards that may evolve but will never go away.

### What about this site though?

This very site is built with a shiny new SSG, [Astro](https://astro.build), isn't that a bit hypocritical? I don't think so, but hear me out!

Take a look at the [sourcecode](https://github.com/navillus-bv/navillus-dev) for this project and you'll see that the real meat of the site is based entirely on the standards above. SCSS is used for styling, but honestly the only reason we even used that was because CSS nesting isn't supported yet.

Most of the site's pages are authored in markdown and various bits of data are stored in JSON.

Page templates and components are in `.astro` files that really just consists of JavaScript in the form of [frontmatter](https://docs.astro.build/core-concepts/astro-components#frontmatter-script), styles are either in global `.css` files or component-level `<style>` blocks, and markup is mostly HTML with a bit of JSX-like javascript inline for conditionals and for-each loops.

It would take a matter of a few hours to migrate the entire site to a different SSG, or even an entirely different platform like [Next.js](https://nextjs.org).

So yes, we're technically using a few new build tools to wire templates together, but at the end of the day it's easy to use Astro and forget that you aren't using the basic, web-native HTML/CSS/JS stack.

## Innovation is amazing, just don't get stuck

It's a very common mistake, especially for developers newer to web development, to get stuck on the hamster wheel chasing the latest toy. Don't avoid innovation, just be strategic and selective in where you invest your time and efforts!

There's always a new tool to try or pattern to learn, but at the end of the day it's much more satisfying to ship a product rather than trying out a new tool with sample projects that never sees the light of day!

I feel like I bashed on react here - don't get me wrong, react is an excellent and extremely powerful tool. React still has a huge lead in usage compared to the other frontend frameworks and, especially if you're in the job market, it's much easier to find job listing that require react experience than listings that don't mention react at all. But if you find yourself running in circles, getting frustrated with a build pipeline that's fighting you or magic hooks that you don't understand, take a step back and learn the basic (boring) 20 year old tools. Ship fast, don't break the build!
