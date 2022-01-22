---
title: Class properties in Svelte
description:
  A handy trick to make your Svelte components feel even more like plain
  old HTML.
social_image: '/uploads/2021-06-25-svelte-class-props.jpg'
date: '2021-06-25T17:50:21Z'
tags:
  - svelte
  - react
permalink: '/blog/svelte-class-props'
published: true
last_modified_at: ''
blocks: []
tweet_id: '1408488530779717636'
author: src/data/authors/tony-sull.json
---

I've noticed an interesting pattern when a [React](https://reactjs.org/) developer gives [Svelte](https://svelte.dev) a try - they almost immediately add a `className` property to their first Svelte component.

Don't get me wrong, the power of dynamically adding classes to a component can save your butt. The term `className` is a dodge in the JSX world though since `class` is a reserved word in JavaScript. Here's a quick trick to make your Svelte components feel even more like plain old HTML with a proper `class` property!

**tl;dr;** Check out the [REPL](https://svelte.dev/repl/ee6a1591aa214368b56804241f0f4c6d?version=3.38.3) example to see a working example.

## First, the problem

With Svelte, you may think it's as simple as

```html
<script>
  export let class = "";
</script>

<div {class}>...</div>
```

Unfortunately you run smack into the same reserved word problem - Svelte treats the `script` as regular JavaSript (or TypeScript) and won't allow a variable named `class`.

### The workaround

If you're like me you probably hit this once, banged your head against the nearest wall a couple times, then moved on to the obvious fix of renaming the prop to `class`.

```html
<script>
  export let className = ''
</script>

<div class="{className}">...</div>
```

Writing Svelte is so close to HTML that you can almost forget there's a framework at all...until you come across something like `<Button className="send-btn"/>`. Those four extra characters stand out like a sour thumb, flashing a big neon sign to remind you this isn't actually HTML.

## There's an easy fix

```html
<script>
  let className = ''
  export { className as class }
</script>

<div class="{className}">...</div>
```

That's all there is to it! Internally the property is named `className`, avoiding JavaScript's reserved word issue. Externally, though, the component has an optional property named `class`.

```html
<button class="send-btn" />
```

Doesn't that just feel right? No more JSX-like `className` property screaming "is this React!?!"

## Conclusion

React is a very powerful framework and web development wouldn't be where it is today without it. But when it comes to workarounds like renaming `class` to `className`, or camel casing CSS properties for that matter, it can feel freeing when you can move past those quirks and get back to the basics.
