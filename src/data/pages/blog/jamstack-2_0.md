---
title: Jamstack 2.0
description:
  The Jamstack is evolving. Where did it start, and what does it look like
  in 2021?
social_image: '/uploads/2021-05-07-jamstack-2_0.jpg'
date: '2021-05-07T17:39:49Z'
tags:
  - jamstack
permalink: '/blog/jamstack-2_0'
published: true
last_modified_at: '2021-06-05T00:00:00Z'
blocks: []
tweet_id: '1401184029832007680'
author: src/data/authors/tony-sull.json
---

It's time we officially bump the [major version](https://semver.org/) of Jamstack to `2.0`. The term "Jamstack" has always been a bit of a marketing success for a general architecture idea, but most developers took it to mean 90's era websites with nothing but static files on a CDN. The latest frontend framework and serverless infrastructure features are combining to shake up the game - Jamstack is growing up.

## A brief history of everything (web)

Early websites really were nothing more than static documents and browsers were glorified document viewers. Javascript wasn't a thing and styling support was basic (and vendor specific). Developers wrote CSS and HTML by hand, more often than not banging their head against a wall trying to use nested `<table>`s to layout the entire page.

The next big evolution on the web brought us server-side rendering with monolithic backend frameworks built on [Ruby](https://rubyonrails.org/) and [PHP](https://wordpress.com/). The ability to serve up content customized to the person viewing it was huge, and the option to programmatically render pages allowed sites to grow much larger than anyone would have done manually writing every page in markup.

Then things really got interesting. The backend became a bottleneck and logic started moving back to the browser with client-side javascript. This trend really took off with libraries like [Angular](https://angularjs.org), [React](https://reactjs.org/), and [Vue](https://semver.org/). There was one problem though, returning a mostly empty HTML page with a handful of `<script>` tags is terrible for search rankings. Until recently, [Google's search bots](https://web.dev/javascript-and-google-search-io-2019/) didn't even run client-side javascript and would have no idea what was in a purely client-side rendered site.

### Enter Jamstack

Jamstack is really a pretty generic term at the end of the day - any site that uses **J**avascript, **A**PIs, and **M**arkup fits the definition. Until recently that was usually assumed to mean static sites only - pages built with SSG tools like [Jekyll](https://jekyllrb.com/) or [11ty](https://www.11ty.dev/) hosted entirely on a CDN. That was more a sign of the tooling limitations at the time though, not a limitation of what Jamstack was functionally meant to be.

## Generating static sites...dynamically?

> How can my site be static when it needs to show user-specific content like order history or messages?

This question inevitably comes up when talking about Jamstack, and rightfully so. What is the use in pre-rendering a page if all the content changes for logged in users? There is an SEO benefit to serving real content to anonymous users, but you definitely don't want your valuable registered users to see the entire page flash and re-render when the pre-built page is replaced with content specific to them.

### New tech to the rescue

We're starting to see javascript frameworks like [Gatsby](https://www.gatsbyjs.com/) and [SvelteKit](https://kit.svelte.dev) give us the option to partially pre-render sites. Maybe you want to pre-render 90% of a page's content but the last 10% needs to be filled in with user-specific content. Maybe you want to pre-render the most popular pages of your site but leave the rarely requested URLs to render when requested.

Combine these framework features with infrastructure like [Cloudflare Workers](https://workers.cloudflare.com/) and [Netlify Functions](https://functions.netlify.com/) and things really get interesting.

Have hundreds or thousands of content blog posts on a site? No problem, build the handful of main pages once and delay building all your blog posts until a visitor requests the page. Even better, you take advantage of your CDN to cache the built blog post so the serverless function doesn't have to fire back up for the next visitor wanting to read that post.

## What's next?

I'm really excited to see how well frontend framework features like incremental builds tie together with building and caching at the edge with serverless functions. It's a tight needle to thread and there's definitely a risk debugging could be a nightmare, but if done well the value to both developers and site visitors could be huge.

Projects like [Astro](https://astro.build/) seem to be pushing it even further, taking advantage of native ESM imports to lazy load javascript components on the fly. Astro hasn't even been released yet, so we'll have to wait and see how it works, but the concept of combining the best of static site generators like [11ty](https://www.11ty.dev/) with frontend libraries like [React](https://reactjs.org/) and [Svelte](https://svelte.dev/) might just be crazy enough to work!
