---
title: Keeping it simple with Astro
description: Do you really need all that JavaScript?
social_image: '/uploads/2021-06-14-keeping-it-simple-with-astro.jpg'
date: '2021-06-14T17:41:41Z'
tags:
  - astro
  - svelte
  - performance
permalink: '/blog/keeping-it-simple-with-astro'
published: true
last_modified_at: '2021-06-25T00:00:00Z'
blocks: []
tweet_id: '1404538796767694857'
author: src/data/authors/tony-sull.json
---

Frontend frameworks have taken over much of the web, but the question remains - do we really need all that JavaScript in the browser?

## Keeping it simple

Client-side rendering can be an extremely powerful tool, and in some cases can solve problems that are nearly impossible to solve strictly with server rendering. A vast majority of the web is pretty simple though - mostly static content with a bit of interactivity sprinkled in.

The [Navillus](https://navillus.dev) is a perfect example. It has a mobile menu taking advantage of Svelte's excellent [built-in transition](https://svelte.dev/docs#svelte_transition), and we recently added in a dark mode toggle. That's it for interactions on our site though, the rest is entirely static.

![Screenshot of Navillus devtools](/posts/assets/2021-06-14-navillus-dev-tools.png)

Here's a screenshot of devtools with our homepage loaded. A grand total of ~78KB transferred, including all the HTML, CSS, JavaScript, images, and fonts. Don't get me wrong, there's more to web design and development than just minimizing bundle size, but performance matters and small wins can add up quickly.

### What's the trick?

When designing our site we had performance in mind from the beginning. You may notice that we purposely don't have any images on our homepage, and the only icons used are actually taking advantage of the [SVG sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) technique to load all the icons in a single file.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just finished rebuilding <a href="https://t.co/UcT54hdIY5">https://t.co/UcT54hdIY5</a> with <a href="https://twitter.com/astrodotbuild?ref_src=twsrc%5Etfw">@astrodotbuild</a><br><br>Progressively enhanced with <a href="https://twitter.com/sveltejs?ref_src=twsrc%5Etfw">@sveltejs</a> and clocking in at a whopping 12.5KB of total JS. Really digging how easy its becoming to build tiny sites these days</p>&mdash; Navillus (@navillus_dev) <a href="https://twitter.com/navillus_dev/status/1403481307657691139?ref_src=twsrc%5Etfw">June 11, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

As of last week, though, we officially swapped our site over to [Astro](https://astro.build). Why go through all that effort to trust our site with an early beta of a totally new project? Well, why not!

We didn't actually plan to go live with an Astro version of our site, expecting to kick the tires and keep an eye on the project. The build was surprisingly straightforward though, and the results don't lie.

## Shipping just enough JavaScript

The main bit of JavaScript on our site is the mobile menu - we hadn't actually added the dark theme toggle yet when first starting the Astro project. We already posted about [how we built](/blog/progressive-enhancement) our progressively enhanced menu, but the key is that we wanted to use Svelte to easily work with or without JavaScript. If the JS loads, we pull in Svelte's `slide` transition to nicely animate the menu in and out.

With Astro, we can build 98% of our site with little more than HTML templates and markdown while adding in a tiny amount of JavaScript to improve the experience. No client side routing, no frontend framework dynamically rendering the page, no hydration issues or content flickers.

Note: Astro isn't opinionated about what component library you prefer. They shipped with Vue, React, Svelte, and Preact out of the box and more are being added as you read this.

## Speaking of hydration

One of the most interesting ideas about Astro is [partial hydration](https://github.com/snowpackjs/astro#-partial-hydration). By default a component's JavaScript won't even load in the browser, it will only be used on the server. That's not always enough though, and Astro gives you a few options for how to load it on the client.

```astro
<Component:load />
<Component:idle />
<Component:visible />
```

Say it's a component that really needs to be available as soon as possible, just tack `:load` onto the component and it will be loaded on the client when the page loads.

Maybe the component is common but not needed immediately, adding `:idle` instead will tell Astro to wait for the browser to initially load the page and go idle before pulling down the component, boosting performance on initial load.

They have you covered for components further down the page too, `:visible` will take advantage of the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to only load the component if a user scrolls down to it. This might be useful for a contact form at the bottom of a marketing page where you need custom JS validation logic but don't want to risk any performance hiccups when every conversion matters.

### Coming soon to an Astro near you

```astro
<Component:media ="(min-width: 40em)"></Component:media>
```

This is only a proposed feature still open on [Github](https://github.com/snowpackjs/astro/issues/396) and the syntax may very likely change, but the concept here will be a huge win.

Take our mobile menu again. We're using `:idle` to allow our whole page to load before enhancing the menu, but on desktop that menu is never even used. With `:media` or similar we could make sure that the menu's JS is only loaded on mobile viewports, why even both loading it?

## Wrapping up

Keep your eye on [Astro](https://astro.build), follow their [Github repo](https://github.com/snowpackjs/astro) (or star it if you prefer), and check out the community Discord linked on their homepage to give feedback and share your ideas for the future of Astro!
