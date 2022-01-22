---
title: Astro + Forestry CMS
description: Static sites powered by Forestry's git-based CMS, made easy.
social_image: '/uploads/2021-06-28-astro-plus-forestry.jpg'
date: '2021-06-28T17:30:03Z'
last_modified_at: ''
tags:
  - astro
  - cms
permalink: '/blog/astro-plus-forestry'
published: true
blocks: []
tweet_id: '1409606618854088714'
author: src/data/authors/tony-sull.json
---

This is a follow-up post to our [Astro + Netlify CMS](/blog/astro-plus-netlify-cms) demo - check that one out first if you haven't read it yet!

---

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Our go-to content solutions:<a href="https://twitter.com/NetlifyCMS?ref_src=twsrc%5Etfw">@NetlifyCMS</a> for internal projects (when we just need it to work)<a href="https://twitter.com/forestryio?ref_src=twsrc%5Etfw">@forestryio</a> for client projects (when a clean, user friendly UI is a must)<a href="https://twitter.com/fauna?ref_src=twsrc%5Etfw">@fauna</a> (when a file based CMS just won&#39;t cut it)<br><br>What tools are you always reaching for?</p>&mdash; Navillus (@navillus_dev) <a href="https://twitter.com/navillus_dev/status/1406690186189328384?ref_src=twsrc%5Etfw">June 20, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Every CMS has it's benefits and best uses, but it's rare that we have to reach outside these three tools. We've already tried out Netlify CMS with Astro and, not surprisingly given how closely the [Astro](https://astro.build) static site generator sticks to plain old HTML/CSS/JS, it was a breeze to get all setup. This begs the question, how does [Forestry](https://forestry.io/) hold up to this brand new framework?

**tl;dr;** Check out the [live demo](https://demo-astro-forestry.netlify.app), [GitHub repo](https://github.com/Navillus-BV/demo-astro-forestry), or jump straight to the [diff](https://github.com/navillus-bv/demo-astro-forestry/compare/8b8ab5527738d0575a4aa7509ab5c4e605b64736...0aecbd42aaa1dc3bf21b0e0ad93e08fe47e4533b) comparing the demo to the original Astro [blog example](https://github.com/snowpackjs/astro/tree/main/examples/blog).

## The power of Forestry

Forestry CMS sits in a very special niche - a git-based CMS that is designed with non-technical users in mind. Being git-based, it allows for an extremely simple developer experience.

If you're working on a Jamstack project with a statically built front end and expect most of the content updates to be done via the CMS rather than markdown directly, I can't recommend Forestry enough.

**Before you ask** - No, this isn't a paid post. Navillus aren't affiliated with Forestry, we're just big fans of the product.

## What changes were needed

I started this demo with Astro's [blog example](https://github.com/snowpackjs/astro/tree/main/examples/blog). Let's break down the changes that were required to setup the CMS.

### Moving image assets to `/public/uploads`

This one is more personal preference than anything else. Many CMS tools drop all your image assets into the same location and let you visually pick images from a gallery.

The only time I've really found it useful to separate image assets into different directories was to transform specific images depending on their use, and we won't be bothering with image optimization for this demo.

Note that this also requires updating any image references from `/images` to `/uploads`. In our case, that meant updating `/src/pages/about.astro` and each blog post in `/src/pages/posts`.

### Moving authors data to markdown

The example repo includes a `/src/data/authors.json` file which is a basic JSON object/map of the two demo authors. This structure doesn't make as much sense for a file-based CMS.

Instead, let's store each author in a separate markdown file in the `/src/data/authors` directory. Later we can point Forestry to that folder, define the property types available for each author, and allow CMS users to create new authors without touching JSON.

While you're here, make sure each author's image property is pointing to the `/uploads` directory instead of `/images`.

### Loading author information

This really was the only tricky bit to work out.

```js
import authorData from '../data/authors.json'
```

A few different pages and templates need to load the author data, and they all expected ot find a JSON map. Now that each author has a separate markdown file we need to fix how that data is loaded.

```js
let allAuthors = Astro.fetchContent('../data/authors/*.md')
let authorData = allAuthors.reduce((acc, next) => {
  return {
    ...acc,
    [`src/data/authors/${next.slug}.md`]: next,
  }
}, {})
```

What's with the `src/data/authors/${next.slug}.md` code? We'll be setting up Forestry soon, but one thing to note now is how Forestry handles content relationships by default.

By the end of this post you'll be able to create authors in the CMS and link an author to each blog post. That's right, this git-based CMS handles relational data out of the box! (Sorry, no table joins, it's just a git repo!)

Forestry references other CMS objects by absolute path, based on the projects root directory. In the case of `authorData` above, we're mapping from each author's filepath to the author's data. There are other ways you could manage the data here, but for the demo this is easier since you won't need to update the pages templates otherwise.

## Setting up the CMS

This is the easy, and fun, part! Once you have the project building locally and pushed to GitHub, head over to [Forestry](https://forestry.io) and follow their importing walk through.

Forestry's repo onboarding process is really impressive. Once linked to your repo, Forestry walks you through the steps of defining your data types (in our case just Author and Post).

I'll leave it to you to play around with Forestry's content model settings. Take a few minutes to poke around in the different options, especially for defining different property types and data validation.

**Bonus points** Forestry offers live previews that run your actual dev server and give previews of content updates before publishing. I've had luck running Astro with node v14 and out of the box Forestry only offers v12. They support custom docker images from DockerHub though, go nuts and setup your own preview server!

## Conclusion

Keep an eye out for a part two of this Forestry demo! I want to revisit the best way to edit the home and about pages, or create new pages for that matter, right in the CMS.

And yes, if the tweet at the top of this post didn't give it away, we'll be posting an Astro + [FaunaDB](https://fauna.com/) demo soon enough!
