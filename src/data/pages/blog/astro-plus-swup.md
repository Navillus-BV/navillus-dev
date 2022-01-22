---
title: Animated page transitions in Astro with Swup
description:
  Static doesn't mean boring! Easily add client routing and page transition
  animations with swup.js
social_image: '/uploads/2021-07-24-astro-plus-swup.jpg'
date: '2021-07-24T17:34:53Z'
tags:
  - astro
permalink: '/blog/astro-plus-swup'
published: true
last_modified_at: ''
blocks: []
tweet_id: '1418952288476012545'
author: src/data/authors/tony-sull.json
---

I can't be the only developer that has come across a beautifully designed website with top notch animations only to burn an afternoon trying to figure out how exactly they did it. Usually the answer is a combination of 5 different libraries and a pile of JavaScript and CSS being sent over the wire.

Animations don't have to be all or nothing though, and it really can be best to start small and slowly grow and polish the user experience. [Swup](https://swup.js.org) is an excellent starting point, offering all the basics you need to hook up client-side routing with page transition animations. Even better, Swup's API supports [plugins](https://swup.js.org/plugins) with over a dozen pre-made plugins for the most common use cases and a simple API to roll your own custom plugin.

**tl;dr;** Adding page transition animations to [Astro's](https://astro.build) [blog-multiple-authors](https://github.com/snowpackjs/astro/tree/main/examples/blog-multiple-authors) example was surprisingly simple. Check out the [source code here](https://github.com/Navillus-BV/demo-astro-swup) or jump right into the [live demo](https://demo-astro-swup.netlify.app/)!

## Setting up the project

There's very little setup here since we're starting with an existing Astro starter. First, let's use [degit](https://github.com/Rich-Harris/degit) to create a local copy of the blog example

```bash
npx degit snowpackjs/astro/examples/blog-multiple-authors demo-astro-swup
```

### Prepping for swup.js

There are great docs on [swup's site](https://swup.js.org/getting-started) so I won't get too in the weeds, but it's worth having a basic idea of how the routing will work.

When a visitor clicks a link on your site, swup will hijack that request and attempt to load the next page in the background. By default swup looks for an element with the ID `#swup` on every page (this is configurable). When navigating to a new page, swup loads the new content in the background and swaps out all the old content inside the `#swup` element for the content in the new page.

During the navigation, CSS classes like `is-animating` and `is-leaving` are added giving you hooks to trigger the actual transition animations.

With that said, it'll be a little easier to add swup to every page on your site if they are all using a shared layout component in the Astro project. See [this commit](https://github.com/Navillus-BV/demo-astro-swup/commit/792e8f996870166684f2299ac315ca7f82d72b39) if you're curious exactly what I moved around to create the common layout component in this project.

Most importantly, in `src/layouts/Main.astro`

```html
<main id="swup" class="wrapper">
  <slot />
</main>
```

This ensures that the `#swup` element is on every page and wraps all page-specific content that should be replaced during a page navigation.

## Adding swup.js

Swup is extremely configurable, but one NPM dependency and a couple lines of code is really all it takes to get started.

```bash
npm install --save-dev swup
```

Initialize swup in `/public/app.js`...

```js
import Swup from 'swup'

const swup = new Swup()
```

Finally, import `app.js` in the shared layout...

```astro
<html>
  <body>
    ...
    <script type="module" src="/app.js"></script>
  </body>
</html>
```

### Adding transition animations

Ok, so that won't actually animate anything yet. Check out swup's [theme docs](https://swup.js.org/themes/create-theme) if you want to write your own CSS animations, but they do include a few basic themes on NPM. We'll stick with the basic slide theme for now, which you can see in action on the [live demo](https://demo-astro-swup.netlify.app/).

```bash
npm install --save-dev @swup/slide-theme
```

```js
import Swup from 'swup'
import SwupSlideTheme from '@swup/slide-theme'

const swup = new Swup({
  plugins: [new SwupSlideTheme()],
})
```

### Supported scoped styles

Astro supports [scoped styles](https://docs.astro.build/guides/styling#scoped-styles) out of the box. This can be a huge win for performance and avoiding unnecessary CSS in the browser, but we'll need swup to update any linked stylesheets when navigating to a new page.

> This is actually a problem I ran into with [barba.js](https://barba.js.org/). I couldn't for the life of me figure out how to update the page's `<head>` when navigating. It seems like this may have been possible in `v1` but is no longer supported in `v2`.

Thankfully, swup has this covered with their [head plugin](https://swup.js.org/plugins/head-plugin).

```bash
npm install --save-dev @swup/head-plugin
```

```js
import Swup from 'swup'
import SwupHeadPlugin from '@swup/head-plugin'
import SwupSlideTheme from '@swup/slide-theme'

const swup = new Swup({
  plugins: [new SwupHeadPlugin(), new SwupSlideTheme()],
})
```

Plugins to the rescue again! This plugin will replace the old `<head>` with the version in the new page when navigating - it even has [config options](https://swup.js.org/plugins/head-plugin#options) should you need to persist some styles or meta tags on every page!

### Accessibility support

Page transitions can really ruin the experience for anyone visiting your site with an accessibility tool like a screen reader. Many accessibility tools depend on browser events to know when the page content has changed, with swup manually changing out the DOM content a reader may never realize anything changed.

Again, there's a handy plugin to take care of this accessibility problem. It isn't a magic bullet and I strongly recommend you manually test all of your sites with a screen reader - if nothing else it's enlightening to see how different using the web can be if you are visually impaired!

```bash
npm install --save-dev @swup/a11y-plugin
```

```js
import Swup from 'swup'
import SwupA11yPlugin from '@swup/a11y-plugin'
import SwupHeadPlugin from '@swup/head-plugin'
import SwupSlideTheme from '@swup/slide-theme'

const swup = new Swup({
  plugins: [new SwupA11yPlugin(), new SwupHeadPlugin(), new SwupSlideTheme()],
})
```

## Progressively enhanced, for free!

Take a look at our [Progressively enhancing Svelte with JavaScript](https://navillus.dev/blog/progressive-enhancement) post for a more detailed explanation of why progressive enhancement is so important, but suffice it to say a site should never require JavaScript to be usable.

In the case of swup transitions, if JavaScript fails or is disabled for any reason we have a perfectly functional static site that can navigate to new pages like normal. Swup doesn't change your links or `<a>` tags at build time, so if `app.js` never loads or hits an exception you're left with exactly the same static site that Astro built in the first place!

## Conclusion and next steps

There's plenty more you could do here to really get crazy with animations. Pull in [gsap](https://greensock.com/gsap/) to create intricate animation timelines or add transition animations to SVGs. Though I haven't tried it yet, I see no reason why you couldn't have multiple instances of swup targeting different portions of your page.

Follow us on [Twitter](https://twitter.com/navillus_dev) if that's your thing, and reach out to share the animations you come up with for your own site!
