---
title: Introducing chisel.css
description: A (work-in-progress) minimalist CSS framework.
social_image: '/uploads/2021-06-02-introducing-chisel.jpg'
date: '2021-06-02T17:37:30Z'
tags:
  - intro
  - css
permalink: '/blog/introducing-chisel'
published: true
last_modified_at: '2021-06-05T00:00:00Z'
blocks: []
tweet_id: '1401971725412282374'
author: src/data/authors/tony-sull.json
---

Have you ever really tried rendering some HTML without any CSS? It's a hot mess! Modern browsers are [operating systems](https://www.google.com/chromebook/chrome-os/) unto themselves these days - I don't envy anyone who has to sift through the complexity to add even a basic feature to a browser these days. But damn do I wish they would add spend a couple days to ship some decent looking default styles for HTML5 elements!

## Enter chisel.css

Yes, it's another CSS framework. No, we don't want to see it being used for the next 10 years. If we have our way, `chisel.css` will make clear just how easy it could be to have modern designs with out-of-the-box HTML elements.

We've included the most common browser resets, similar to [normalize.css](https://github.com/necolas/normalize.css) or [sanitize.css](https://csstools.github.io/sanitize.css/), along with modern styling based on [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

## Why the name?

Ask any woodworker that's dabbled in hand tools and fine joinery what tool they'd keep if they could have only one, it'd be the chisel. Most people never even think about it, but when it comes down to it almost every tool used on wood is basically just a chisel anyway.

Take a close look at a saw (be careful!). See all those tiny chisels we call saw teeth? Now look at a drill bit - yep, it's pretty much a chisel blade twisted around a stick.

We realized we kept starting with the same basic CSS resets and element styles for virtually every Navillus project, after pasting it a half dozen times we figured it was time to standardize. The project quickly took aim at building one CSS framework that can be a complete reset for both browser vendor issues and horribly styled HTML elements.

Change a few variables here and there, but the goal is for chisel to help every site look good without immediately, ready for your throw in your custom CSS (or wrap a chisel around a stick if you still can't find that damn 3/8" drill bit).

## How to use it

Check out the [docs](https://navillus-bv.github.io/chisel/) for full details, but it really is as simple as

```bash
npm i -s chisel.css
```

or from a CDN

```html
<link href="https://unpkg.com/chisel.css" rel="stylesheet" />
```

Minified and compressed the entire bundle is ~3.2KB, with full support for dark mode and basic app theming.

## Eating our own dog food

We recently updated [navillus.dev](https://navillus.dev) to use `chisel` as a basis for styling, you can see the complete [pull request](https://github.com/Navillus-BV/navillus-dev/pull/11/files?file-filters%5B%5D=.postcss&file-filters%5B%5D=.svelte) on GitHub. I'm always a fan of seeing a pull request full of red, gotta love code cleanup!

Granted we're a bit biased here, most of the common CSS we copy into every Navillus sites made it's way into chisel. The power of CSS variables lets you make some pretty drastic changes though, with very little effort.

Want a different primary color? No problem, change `--chisel-primary` and you're all set. Prefer a different [type scale](https://type-scale.com/)? That's simple too, check the docs for our variables like `--chisel-h1` or `--chisel-p`.

## Dark theme

Dark theme support is one that gave us more headaches than expected. We wanted chisel to support both browser's native `prefers-color-scheme` as well as a fallback option. We landed on a custom HTML data property, `data-chisel-theme`. In the future we plan to ship predefined color palettes that will also take advantage of the HTML `dataset` property.

So what went wrong? If you take a look at v0.4.0, we added custom CSS properties for component-level styling similar to `--chisel-button-bg`. This worked great for making it simple to custom style buttons, say if you want a button variant like `.button-hollow`. Each component property defaulted to one of the main color palette styles, a la `--chisel-button-bg: var(--chisel-primary)`.

### There in lies the problem.

At least on some browsers, CSS variable scope isn't always what you'd expect.

```css
[data-chisel-theme='dark'] {
  ---chisel-primary: #002244;
}
```

You'd think this would also update any CSS properties referencing this variable. Nope! If `--chisel-button-bg` is only defined on the `:root` scope it isn't necessarily going to be updated to the new color code. This seems like a bug to me, and I have it on my list to dig through the spec to see if that's actually expected behavior, but in the meantime we will avoid it.

Yes, we could use component variables if we redefined `--chisel-button-bg` in the `dark` theme selector as well. That'd lead to way to much bloat and extra CSS though, it wasn't worth the extra KB.

## WIP

Chisel is still very much a work in progress. Head over to the [GitHub repo](http://github.com/navillus-bv/chisel) to file bugs, request new features, and star the project to follow the latest updates!
