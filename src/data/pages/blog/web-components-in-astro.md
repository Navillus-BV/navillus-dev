---
title: How to use Web Components in Astro
description:
  Building custom elements in plain old JavaScript + trying out the new
  Astro.resolve() API!
social_image: '/uploads/2021-08-23-web-components-in-astro.jpg'
date: '2021-08-23T17:51:19Z'
tags:
  - astro
  - web components
permalink: '/blog/web-components-in-astro'
published: true
last_modified_at: ''
blocks: []
tweet_id: '1429903001574068232'
author: src/data/authors/tony-sull.json
---

Web components have had a bit of a rocky past, to put it lightly. The API design has gone through multiple iterations, a few unexpected [rough edges](https://thenewobjective.com/web-development/a-criticism-of-web-components) really hindered their usefulness. And if it wasn't already confusing enough, the level of excitement around the vision of custom elements has led to [over **50**](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) different patterns and frameworks to get the job done.

I've honestly not given custom elements much of a chance since the early iterations of the spec, and its about time I give it a proper chance again. Like many web developers I really love the vision of having a standard for building native custom components without reaching for the [usual](https://reactjs.org) [JavaScript](https://svelte.dev) [frameworks](https://vuejs.org).

**tl;dr;** Web components aren't the magic bullet I'd hoped for, but they've come a long way in the last couple years. When paired with Astro's new [resolve](https://docs.astro.build/reference/api-reference#astroresolve) API you end up with a dead simple way to quickly author simple pure JavaScript web components, bundle them for production, and hydrate them on the client. Check out a [live demo](https://demo-astro-web-components.netlify.app/) or jump right into the source code on [GitHub](https://github.com/navillus-bv/demo-astro-web-components).

## Do web components require a framework?

No! There are great options if you're ready to go all-in on frameworks though, I strongly recommend you checkout [webcomponent.dev's](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) detailed breakdown of all the different ways it can be done.

At the end of the day though, the frameworks are just going to compile down to JS (I haven't seen any WASM implementations yet). Frameworks like [Lit](https://lit.dev/) let you skip the boilerplate and can help avoid some of the gotchas along the way, but what's a basic web component even look like?

### Less complicated than it sounds

Web components can be daunting - shadow roots, `<template>`s, and `extend HTMLElement` aren't exactly old hack for most web developers. Let's break down the basic structure first, then jump into an full example.

## Web component basics

Fair warning, I'm by no means an expert on web components - please hit me up on [Twitter](https://twitter.com/navillus_dev) if I misrepresent something here!

### Shadow roots

One of the more contentious parts of the spec, and the cause of many of the limitations, is the shadow DOM. The idea is to encapsulate each custom element from the rest of the DOM - if you've ever worked with `iframe`s this will sound familiar.

The key here is that code outside of the custom element can reach down into the shadow DOM and change things, styling for example. It doesn't work the other way around though, elements and styles inside the shadow DOM can't reach outside and affect the outside world.

Sounds great, until you want a web component to change it's style based on the content around it - theming can be tricky and force you to jump through hoops.

Thankfully, the shadow DOM is actually opt-in and you can extend `HTMLElement` without losing access to the rest of the DOM.

### HTML `template`s

Web components are meant to be reusable, and for that to be possible you need to be able to define a template with the element's initial HTML elements and styles.

This can be done a few different ways, but the most common way is to use template literals right in your web component's JS file. I'll be using one of the excellent examples from [webcomponents.dev](https://webcomponents.dev/edit/ZCUsvyx06Au5j0yZzgG7?pm=1) as a starting point.

```js
const template = document.createElement('template')
template.innerHTML = `
  <style>
    /* your styles */
  </style>
  <span id="count"></span>
`
```

Feels a little weird writing HTML in a template literal, right? It gets the job done though, and in my opinion plain JS web components really shine with small components so this shouldn't get too crazy to maintain.

All this really does is create a new `<template>` tag, just like if you directly included it in your `index.html`. The template contains all the initial styling and HTML used to initialize the component.

### extending HTMLElement

This is where it gets really interesting. Ever wonder why you can't make your own `<select>` or `<input>` elements? Well now you can (kind of)! I wouldn't recommend trying to actually replace existing HTML tags - I don't know if that would even work and it sounds like a nightmare for accessibility tools.

But you can make your own `<my-counter>` component, that's definitely not part of the HTML specs.

```js
class MyCounter extends HTMLElement {
  constructor() {
    super()
    this.count = 0
    // open mode keeps all elements accessible to the outside world
    this.attachShadow({ mode: 'open' })
  }
  // ...
}

// tell the browser to use this class for all `<my-counter>` elements
customElements.define('my-counter', MyCounter)
```

Notice the `open` mode there? I mentioned earlier that you can avoid the one-way encapsulation of the shadow DOM, that's all it takes. It's a shame having to turn off one of the key features of custom elements, but theming and styling really can be a big problem for real world apps!

### Filling in the details

I'll leave it up to you to check out the full source code on [GitHub](https://github.com/navillus-bv/demo-astro-web-components). I also recommend checking out the examples from [webcomponents.dev](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) as well to see what all I had to change. Spoiler: not much!

## How does this work in Astro?

One huge benefit of Astro is the heavy focus on minimizing, or even completely avoiding, the amount of JavaScript used on a site. I've written [before](/blog/keeping-it-simple-with-astro) about how important simplicity is in web development, so I'll spare you the rant here.

For me, the big promise of web components is the ability to easily share basic elements across multiple projects without being tied to one specific framework. I'm not ready to build an entire PWA in web components, but when it comes to the base-level building blocks for a site I'd love to share a single `<nv-button>`, `<nv-spinner>` etc.

Maybe one of these days I'll find the time to build a full [OpenUI](https://openui5.org/) toolkit to use for all of our client projects...

### Oops, our web component breaks SSR!

```js
const template = document.createElement('template')
```

Well that didn't take long, literally the first line of code breaks our Astro build 🤣

Astro is a static site generator, the entire build runs in Node.js. That means we can't actually touch the browser-only `document` object.

```js
// Just create a shared string here, no more document reference
const template = `
  <style>
    /* your styles */
  </style>
  <span id="count"></span>
`

class MyCounter extends HTMLElement {
  constructor() {
    super()

    const elem = document.createElement('template')
    elem.innerHTML = template

    this.count = 0
    this.attachShadow({ mode: 'open' }).appendChild(
      elem.content.cloneNode(true)
    )
  }
}

customElements.define('my-counter', MyCounter)
```

There we go! Don't touch the document element at all until the constructor is called. Note that this really could/should be cleaned up to move `elem` outside the class and only initialize it once, but for the sake of this demo I kept the code easier to follow.

### Great, but how do we actually load the script?

Astro just recently released [version 0.19](https://astro.build/blog/astro-019), one of the cool new features is the `Astro.resolve()` API. With it, you can take a relative URL to another file in your `src/` directory and resolve it to the built file path.

This is handy for images, `Astro.resolve('../images/penguin.png')`, but we're going to take it a step further and use this new API to pull in our web component's JS file.

In the demo project, the web component is defined in `src/components/my-counter.js`. Inside the homepage at `src/pages/index.astro`,

```astro
<head>
  <title>Welcome to Astro</title>

  <script type="module" src={Astro.resolve('../components/my-counter.js')}
  ></script>
</head>

<body>
  <my-counter></my-counter>
</body>
```

That's all there is to it! From there Astro will be aware of the JS file, bundle it during production builds, and replace the `Astro.resolve` call with the URL needed to load in the component.

#### Future reading

Follow us on [Twitter](https://twitter.com/navillus_dev) or subscribe to our [RSS feed](https://navillus.dev/feed/blog.xml) so you don't miss a future post covering more complex web components written with [Lit](https://lit.dev/)!

## Conclusion

Web components aren't a magic bullet, but I found this experience **much** less frustrating than the last time I tried it out. To be fair, that was probably back in 2017 when the spec was still an early work in progress.

I'm still not sure that I'd go through the effort to build an entire site in custom web components just yet, but I won't actually be surprised if that's a great option in the not too distant future.

Until then, browser support is [surprisingly good](https://caniuse.com/?search=web%20components) and web components can be a great solution to reusable base components. Whether you're managing multiple projects or just preparing for the next big shakeup in frontend frameworks, it's worth giving native custom elements a second look in 2021.
