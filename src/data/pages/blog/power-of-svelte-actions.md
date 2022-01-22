---
title: The power of Svelte actions
description: When you should `use:` actions in Svelte.
social_image: '/uploads/2021-06-03-power-of-svelte-actions.jpg'
date: '2021-06-03T17:48:11Z'
tags: []
permalink: '/blog/power-of-svelte-actions'
published: true
last_modified_at: '2022-06-05T00:00:00Z'
blocks: []
tweet_id: ''
author: src/data/authors/tony-sull.json
---

Svelte does an excellent job of blurring the lines between frontend frameworks and plain old HTML/JS. Leaning on Svelte's [reactivity model](https://svelte.dev/docs#2_Assignments_are_reactive), [property binding](https://svelte.dev/docs#bind_element_property), and [event directives](https://svelte.dev/docs#on_element_event) will get you 99% of the way to a finished app, but every once in a while you just really need to work directly with the `HTMLElement`.

This can be done in a one-off way with the `bind:this` approach to getting a local reference to a DOM element, but there's a better way. The `use:` directive allows for reusable logic to be pulled out of the component itself.

Let's take a look at a really common use for this - listening for clicks/taps outside an area of the UI. I used this recently for [Kamfly's](https://kamfly.io) modals, instead of adding a one-off click listener in the `Modal` component I created a `clickOutside` action that can be reused elsewhere. This can also help make testing a whole lot easier, testing the async nature of a full blown Modal component can be tricky, testing just the action itself is much less complicated!

**tl;dr;** Check out the final example in this [Live REPL demo](https://svelte.dev/repl/c44a10b2b200447ab733da39a448111d?version=3.38.2).

## Svelte actions

Svelte's official tutorial has an excellent walk through of [what actions are](https://svelte.dev/tutorial/actions), but basically you can think of actions as lifecycle hooks for DOM elements themselves. An action works much like `onMount` or `onDestroy`, but actions are tied to DOM elements themselves rather than entire Svelte components.

### Why bother with actions?

It's easier to reach for `bind:this` when the component you're working on needs to interact with a DOM element. I won't jump into the DRY design principles debate, instead just look at the testing challenges.

Many projects end up needing a modal at some point, and they're almost always ignored in automated testing. When the component itself is responsible for hiding/showing the modal, managing a stack of multiple open modals, etc. the logic gets tricky fast.

Testing asynchronous behavior like animations or modals hiding/showing based on user input can be a chore. What if you could move some of that logic out to a reusable function?

### Anatomy of an action

```ts
action = (node: HTMLElement, parameters: any) => {
	update?: (parameters: any) => void,
	destroy?: () => void
}
```

That's really all there is to it! An action in Svelte takes in the DOM element and (optionally) user defined parameters. The `action` function can run initialization logic on the element before returning `update` and `destroy` handlers (both optional).

## `use:` clickOutside

Let's look at a really common UX pattern - a modal is open on screen and you want it to hide when the user clicks/taps outside the modal (often on some kind of grayed out background).

This isn't a big deal to do in the Modal component itself - add an extra DOM element for the grayed out background and add a click handler to it. But what if you want a similar interaction for your mobile menu? That component is almost certainly different, if you copy the code over now you have duplicated JS in your site **and** you need complicated test coverage testing the close functionality for both components.

### The clickOutside action

```ts
export default (node, _options = {}) => {
  const options = { onClickOutside: () => {}, ..._options }

  function detect({ target }) {
    if (!node.contains(target)) {
      options.onClickOutside()
    }
  }
  document.addEventListener('click', detect, { passive: true, capture: true })

  return {
    destroy() {
      document.removeEventListener('click', detect)
    },
  }
}
```

There's a few things going on here, let's break that down.

First, the action is taking in optional parameters (`_options`). The action expects `options.onClickOutside` to be a callback function, if one wasn't provided it's defaulted to a noop function.

The `detect` function does the real work of checking to see if a click event on the page was inside the original DOM element. The event listener is using `passive` to avoid scrolling performance issues, and `capture` to make sure that all clicks bubble up to the listener.

Finally, the action returns a `destroy` callback that will clean up the event listener when the element is being removed from the DOM.

### Allow components to whitelist elements to ignore

```ts
export default (node, _options = {}) => {
  const options = { include: [], onClickOutside: () => {}, ..._options }

  function detect({ target }) {
    if (
      !node.contains(target) ||
      options.include.some((i) => target.isSameNode(i))
    ) {
      options.onClickOutside()
    }
  }

  /** Same as above */
}
```

A little extra functionality here allows components to pass in other DOM elements that should be considered as "inside" the action (rather than "outside").

## How to test it

UI testing will be a topic for another day, but you can see how much easier this will be to test. Instead of having to write tests that can reliably wait for a Modal component to animate into view before testing the click away scenario, tests could work more closely to the REPL demo (below). DOM elements for a test wouldn't need to animate at all, they just need to accept a `click` event so the test can count how many times the `onClickOutside` handler was called!

## Live REPL demo

That's all, folks! Check out the [Live REPL demo](https://svelte.dev/repl/c44a10b2b200447ab733da39a448111d?version=3.38.2) for a working example.
