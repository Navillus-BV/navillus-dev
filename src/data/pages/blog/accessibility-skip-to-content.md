---
title: 'Web Accessibility: Hidden links make all the difference'
description:
  We specialize in findFor visitors that use a keyboard or screen reader
  to navigate websites, hidden quick links can make a site much more enjoyable.ing
  simple solutions to complex software problems. We value data-driven decisions and
  accessibility over this month's latest tech trends.
social_image: '/uploads/2021-05-10-accessibility-skip-to-content.jpg'
date: '2021-05-10T17:26:48Z'
last_modified_at: '2021-07-21T17:26:48Z'
tags: []
permalink: '/blog/accessibility-skip-to-content'
published: true
blocks: []
tweet_id: ''
author: src/data/authors/tony-sull.json
---

Accessibility is a bit of a polarizing topic when it comes to web technologies, but it doesn't have to be. Accessibility isn't an all or nothing game and more often then not there are small, simple changes that can make a huge difference in both keyboard and screen reader support. Let's take a look at an accessibility easter egg that [may not be new](https://webaim.org/techniques/skipnav/) but is still sorely lacking on many of even the most popular sites.

## "Skip navigation" links

Every web developer should try [using a screen reader](https://www.codecademy.com/articles/how-to-setup-screen-reader) at some point. If you've ever tried tabbing through a website you'll get the general idea, the screen reader (or your keyboard's focus) move one by one through every element on the page. We can modify that behavior with [aria](https://www.w3.org/TR/html-aria/) tags, [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex), and certain CSS properties, but one not so obvious solution is to actually hide links on the page that only show up once they are given focus by the keyboard or screen reader.

Curious what that looks like? Go over to [GitHub](https://github.com/)'s main site and logout if you are currently signed in (or use a private tab). Click in the address bar to put focus just above the page's content, then start tabbing down. You'll likely tab through some of the browser's chrome first, but as soon as focus gets to the site's content you'll see a big blue "Skip to content" button appear in the top left corner.

### What's it for?

Even on a small site the navigation header likely has 6 to 10 interactive elements (brand logos, page links, login/logout buttons). Visually that isn't a big deal, navigation headers are almost always designed to pack all that content into a relatively small portion of the screen. Functionally, though, that's 6 or 10 different elements the user would need to walk through before even hearing the main title in the hero section. That's a huge barrier to entry!

Back to the GitHub example, when "Skip to content" has focus and is visible on screen you can still tab past it and walk through every link in their navigation. The real trick is what happens if you hit `Enter` on that hidden link - the window's focus skips past the navigation header and puts focus into the hero section. In the case of GitHub, after you click "Skip to content" the next `Tab` will focus on the email signup form rather than the logo in their navigation header.

### How it works

The trick here requires two elements on the page. The very first focusable element on the page will be a new `<a>` that is the hidden link itself. We want this to work whether JavaScript is enabled or not, so let's make sure to [progressively enhance](/blog/progressive-enhancement) this feature.

## Time to code it

Actually implementing this hidden button can be a bit confusing at first, Let's take it one step at a time.

### Start with the HTML

```html
<body>
  <a href="#start-of-content" class="sr-only sr-only-focusable">
    Skip to content
  </a>

  <header>
    <!-- Your header content goes here -->
  </header>

  <div id="start-of-content" class="sr-only"></div>

  <section>
    <!-- Your awesome hero section -->
  </section>
</body>
```

Nothing to crazy here. You're exact implementation might look different, but the key is adding a new anchor tag at the top of the page and a new `div` immediately after the header.

The `<a>` doesn't necessarily have to be the first child of the page's `body`, but it's important that it is the first focusable element in the DOM.

### Add a little CSS

```css
.sr-only {
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: rect(1px 1px 1px 1px);
  /* maybe deprecated but we need to support legacy browsers */
  clip: rect(1px, 1px, 1px, 1px);
  /* modern browsers, clip-path works inwards from each corner */
  clip-path: inset(50%);
  /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
  white-space: nowrap;
}

.sr-only.sr-only-focusable:focus {
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  clip-path: initial;
  white-space: normal;
}
```

> Update: `.sr-only` class updated based on some excellent feedback from Inclusivity Hub on [dev.to](https://dev.to/navillusbv/web-accessibility-hidden-links-make-all-the-difference-27a7)

You have likely seen `sr-only` helper classes elsewhere, most CSS frameworks like [Bootstrap](https://getbootstrap.com/) and [Tailwind](https://tailwindcss.com/) include them out of the box.

If you haven't seen `sr-only-focusable` before, that's just an extra helper class that allows the element to be visible _only_ when it has `:focus`.

### Enhance it with JavaScript

> Update: Looking for a no-JS solution? Skip the JS logic and point your "Skip to Content" link straight to your `<main id="main">` block!

This feature already works as-is, no JavaScript at all. There is a catch though, clicking anchor tags with with `href="#start-of-content"` will update the URL in the address bar. That's not always ideal and could even break your page if you are using hash routing.

```js
function onSkipToContent(event) {
  // Stop the event's default behavior
  // In this case, don't let it actually change the page's URL
  event.preventDefault()

  // Find the hidden target div
  const target = document.getElementById('start-of-content')

  if (!target) {
    return
  }

  // Find the next element in the DOM
  const content = target.nextElementSibling

  if (content instanceof HTMLElement) {
    // Make sure the content div can't be tabbed to again, the give it focus
    content.setAttribute('tabindex', '-1')
    content.focus()
  }
}

// Find the hidden "Skip to content" link and hook up tje click event
const link = document.querySelector('a[href="#start-of-content"]')
if (link) {
  link.addEventListener('click', onSkipToContent())
}
```

This will look a little different depending on how your frontend JS is setup and whether you are using a framework like [React](https://reactjs.org/) or [Svelte](https://svelte.dev/). The concept should be easy to transfer though, you just want to take over the `<a>` element's click event and manually send the window's focus down the page.

Why bother with `nextElementSibling`? Well it may not be necessary, but we added that `div` as a bookmark and don't want it to actually take focus in the window. Instead, we want to find that bookmark and give focus to whatever comes next in the DOM.

## That's all, folks!

Adding two elements and a bit of CSS gives us a fully functional "Skip to content" link for keyboard and screen reader users. Another dozen or so lines of JavaScript and we progressively enhanced the link to work as expected with any JavaScript framework or routing scheme the site might be using.

Stay tuned for more accessibility posts in the future!
