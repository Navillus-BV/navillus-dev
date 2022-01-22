---
title: Astro + Foresty CMS Revisited
description: Static sites powered by Forestry's git-based CMS, made even easier.
social_image: '/uploads/2021-08-03-astro-plus-forestry-revisited.jpg'
date: '2021-08-03T17:28:39Z'
last_modified_at: ''
tags:
  - astro
  - cms
permalink: '/blog/astro-plus-forestry-revisited'
published: true
blocks: []
tweet_id: '1422604180984934404'
author: src/data/authors/tony-sull.json
---

It's been just over a month since the original [Astro + Forestry CMS](/blog/astro-plus-forestry) demo, but things have been [moving quickly](https://github.com/snowpackjs/astro/blob/main/packages/astro/CHANGELOG.md) in Astro land! We'll build upon the original demo, go ahead and check out the first post if you haven't done so already!

**tl;dr;** We received some great feedback from [Forestry](https://twitter.com/forestryio) after the original demo was released. I had been holding off on revisiting that post until a few Astro features were released. Check out the [live demo](https://demo-astro-forestry.netlify.app), or dive into the main [diff](https://github.com/Navillus-BV/demo-astro-forestry/commit/8660fb54988390b3a27d65a3abfe784725d789df) that includes most of the updates listed below.

Specifically, Astro's [Collections API](https://docs.astro.build/core-concepts/collections) was updated to handle even more use cases. Oh yeah, and their [docs site](https://docs.astro.build/) was launched! It's hard to believe this project was only announced a few months ago, the community has really grown quickly and countless hours were put in to build a great looking (and localized!) documentation site.

## Feedback straight from the source

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Awesome post 👏<br>We should give a try to <a href="https://twitter.com/astrodotbuild?ref_src=twsrc%5Etfw">@astrodotbuild</a> 🚀<br><br>Minor feedback:<br>1. You could set /images as your default media folder instead of the default /uploads to further reduce the diff. <br>2. Authors could be stored as JSON file(s) instead of Markdown if you don&#39;t need a body.</p>&mdash; Forestry CMS (@forestryio) <a href="https://twitter.com/forestryio/status/1409905329845030916?ref_src=twsrc%5Etfw">June 29, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Default media folders

Forestry's CMS is [extremely flexible](https://forestry.io/docs/quickstart/configure-cms/), and honestly its crazy the feature set they're able to offer while storing all your data in your own git repo. _No, this isn't a paid post. I'm a user of Forestry and big fan of the git-based CMS approach!_

One of many options when configuring Forestry is the default folder for [media uploads](https://forestry.io/docs/quickstart/configure-cms/#media-settings-examples). I definitely had an eye towards minimizing the diff in the original demo, I'm just in the habit of using a `/uploads` directory for user uploaded content. Old dogs, new tricks, and all that.

### Authors stored in JSON

This was excellent feedback, and worth digging into a little further.

I originally had author information stored in separate markdown files, `/data/authors/don.md` and `/data/authors/sancho.md`.This honestly didn't make that much sense, markdown is a great way to combine properties and content (usually built to HTML). The blog demo doesn't have any author-specific content, just a few properties like `name` and `image`.

Given that the site doesn't need to pull any HTML content for the author, it makes much more sense to store that data in a simple JSON file. Let's get rid of the author markdown files entirely, replacing it with `src/data/authors.json`:

```
{
  "don": {
    "name": "Don Quixote",
    "image": "/uploads/don.jpg"
  },
  "sancho": {
    "name": "Sancho Panza",
    "image": "/uploads/sancho.jpg"
  }
}
```

Forestry supports this out of the box, once you [setup the sidebar](https://forestry.io/docs/quickstart/configure-cms/#setting-up-sidebar-content-sections) to include the new JSON file it recognizes that the file is a map and it **just works**. I honestly expected this to fight me a little bit, and was to when I had no issue removing references to the old markdown files. I was even able to reuse the same [content model](https://forestry.io/docs/quickstart/configure-cms/#content-modeling).

I did need to update the content model for posts to reference the new JSON file instead of a markdown file, but a few clicks in the settings menu and it was all hooked back up.

### Bonus points: Instant Previews

Forestry's [instant previews](https://forestry.io/docs/previews/instant-previews/) run your development server in a docker container and allow you to preview CMS updates in realtime. That's one of those features that can push plenty of projects to use a hosted CMS platform, very cool to see live previews working so seamlessly in a git-based CMS.

One issue I ran into when deploying the first demo was that Astro only supported node 14+. Instant Previews allow you to customize which docker image is used for your development server, but I couldn't quite get it to work with an early version of Astro and ran out of time. As of a couple weeks though, Astro now supports node 12 out of the box!

After updating the demo project, setting up instant previews was as simple as going back to Forestry's default preview settings. I had tried a custom docker container with no luck, but the included node 12 + yarn image worked like a charm with the latest version of Astro.

## The New Collections API

The original collections API in Astro was designed before the beta was publicly released, and it turns out there were a few use cases that were more common than expected.

There aren't any monumental changes here, you can dig through the [merged RFC](https://github.com/snowpackjs/astro/pull/703) if you're curious. A few of the API names were updated to be more clear, and the API was updated to work with the newer `Astro.props` API.

You can check out the [diff here](https://github.com/Navillus-BV/demo-astro-forestry/commit/8660fb54988390b3a27d65a3abfe784725d789df#diff-a12b9a8302a65aacc7f592f6058bbc7b2eebcc2509a70ec64f182a67c9d54e45L3) to see exactly what I had to do to update the `$posts.astro` route for the new API. Personally, I'm a fan of the newer design and think the code is a bit cleaner and easier to read.

## Conclusion

Astro has been moving quickly since it's public beta launched! I was glad to see how easy it was to clean up the demo a bit and take even better advantage of Forestry. If you haven't worked with a git-based CMS before I highly recommend you take an afternoon and give it a try. It may not be right for every project, but the developer experience literally having all your CMS data on your local machine just can't be beat!
