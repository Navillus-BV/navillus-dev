---
title: Progressively enhancing Svelte with JavaScript
description:
  That's right! Your site built with a JS framework with client-side code
  can still support users with JS disabled.
social_image: '/uploads/2021-05-08-progressive-enhancement.jpg'
date: '2021-05-08T17:49:14Z'
tags:
  - svelte
  - accessibility
permalink: '/blog/progressive-enhancement'
published: true
last_modified_at: '2021-06-05T00:00:00Z'
blocks: []
tweet_id: '1402315819015622658'
author: src/data/authors/tony-sull.json
---

We've all heard about "mobile first" designs, but what about JavaScript last? It'll need a catchier name to really stick, but many of us ignore how important it is that basic site functionality works even if JavaScript is disabled or has failed. Browsing the web with JavaScript disabled can be a real pain but it happens more then you'd expect.

My trusty [Kobo Aura H20](https://us.kobobooks.com/products/kobo-aura-h2o-edition-2) has a browser in it, but JavaScript is disabled and frankly there's no way the hardware could handle modern JS-heavy sites. Ride a subway in New York and you'll quickly realize how spotty your cell signal can be, and how broken a site will be if the markup loaded but the 1.3MB of JavaScript didn't finish before your connection dropped out.

**tl;dr;** [Click here](https://svelte.dev/repl/267acb68b79647849f0532774d62c594?version=3.38.2) for a working example in the [Svelte REPL](https://svelte.dev/repl/). Or try out the menu on this site - disable your Javascript and shrink the window down to get the mobile view, the menu still works!

## Don't break your mobile menu

The [hamburger menu](https://en.wikipedia.org/wiki/Hamburger_button) is still king of mobile navigation designs, for better or worse. With a hidden menu, the last thing you want is for a visitor to not even be able to move around your site because they chose to disable JS. Even worse, if your site hits an unhandled exception that might break your JavaScript entirely.

The menu is almost certainly going to be interacted with, making design and animations a high priority there. The key is to build your menu so that it works with HTML and CSS only. Your JavaScript should enhance the menu with things like notification badges or animations that can't be done well in CSS.

## Learn by example

We'll take a look at how this can be done in [Svelte](https://svelte.dev), but the same concepts can be applied to any framework.

Go ahead and try a working example right here, this site's menu works similarly. Once scripts are loaded the menu takes advantage of Svelte's built in [slide](https://svelte.dev/docs#slide) transition. Disable JS in your browser though and our menu still works - it doesn't animate in but visitors can open and navigate around no problem.

### A basic header in Svelte

```ts
<script>
  import { slide } from 'svelte/transition'

  let menuOpen = false
</script>

<header>
  <div class="header__top">
    <h1>Navillus</h1>
    <button on:click={() => menuOpen = !menuOpen}>
      &#9776;
    </button>
  </div>

  {#if menuOpen}
  <nav transition:slide>
    <!-- NAV LINKS GO HERE -->
  </nav>
</header>
```

Nothing too crazy going on here yet. If you aren't familiar with [Svelte](https://svelte.dev), `transition:slide` adds an entry and exit animation to the `<nav>` element.

### Hide/show a menu without JS

HTML checkboxes have a pseudo selector for [:checked](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked), let's take advantage of that to show/hide our menu from CSS.

```ts
<header>
  <div class="header__top">
    <h1>Navillus</h1>
    <label for="toggle">&#9776;</label>
  </div>

  <input id="toggle" type="checkbox" class="sr-only"/>

  <nav>
    <!-- NAV LINKS GO HERE -->
  </nav>
</header>

<style>
  #toggle ~ nav {
    display: none;
  }

  #toggle:checked ~ nav {
    display: block;
  }
</style>
```

What's going on there exactly? Instead of a `<button>` there's a `<label>` tied to the checkbox. In CSS, the `nav` element is hidden by default and only shown when the checkbox is `:checked`.

### The best of both worlds

```ts
<script>
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

  let menuOpen = true
  let mounted = false

  onMount(() => {
    menuOpen = false
    mounted = true
  })
</script>

<header>
  <div class="header__top">
    <h1>Navillus</h1>
    <label for="toggle">&#9776;</label>
  </div>

  <input id="toggle" type="checkbox" class="sr-only" class:js={mounted} bind:checked={menuOpen} />

  {#if menuOpen}
  <nav>
    <!-- NAV LINKS GO HERE -->
  </nav>
  {/if}
</header>

<style>
  #toggle:not(.js) ~ nav {
    display: none;
  }

  #toggle:not(.js):checked ~ nav {
      display: block;
  }
</style>
```

#### Wait, what?

Let's break that one down step by step.

First, `menuOpen` is set to true initially and reset to false in Svelte's [onMount](https://svelte.dev/docs#onMount) lifecycle hook. If onMount is called we have JavaScript support and can enhance the menu, until then we stick to the HTML/CSS approach.

We also added in a second boolean flag for `mounted`, and with `class:js={mounted}` we're telling Svelte to add the `js` class to our checkbox once the component's scripts have mounted.

Finally, the CSS has been updated to change the menu's display only as long as the checkbox doesn't have the `js` class. That's the real magic, let CSS handle the show/hide functionality _until_ JavaScript has mounted and Svelte's `slide` transition is ready to animate the menu.

> Oops! It's very easy to inadvertently create accessibility bugs. When manually testing I realized the hidden checkbox wasn't binding to our `menuOpen` state in svelte. The code block above was updated June 2, 2021 to include `bind:checked={menuOpen}` to make sure keyboard users can toggle the menu after Svelte hydrates.

## Bonus points

Svelte's [use:action](https://svelte.dev/docs#use_action) feature can be used to make this a bit more reusable. Actions deserve their own full blog post, but in short an `action` in Svelte is function you can add in markup that will get called with the HTML node once it is created.

Check out the [REPL example](https://svelte.dev/repl/267acb68b79647849f0532774d62c594?version=3.38.2) for a working example a custom `enhance` action replacing the `mounted` and `onMount()` logic above.
