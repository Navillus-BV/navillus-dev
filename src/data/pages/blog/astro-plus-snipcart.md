---
title: Astro + Snipcart
description: Scalable e-commerce made easy with the Jamstack.
social_image: '/uploads/2021-07-02-astro-plus-snipcart.jpg'
date: '2021-07-03T17:33:42Z'
tags:
  - astro
  - snipcart
  - jamstack
permalink: '/blog/astro-plus-snipcart'
published: true
last_modified_at: ''
blocks: []
tweet_id: '1411055265479368707'
author: src/data/authors/tony-sull.json
---

**tl;dr;** Check out the live demo [here](https://demo-astro-snipcart.netlify.app/), or if you're feeling brave dive right into the [GitHub Repo](https://github.com/Navillus-BV/demo-astro-snipcart) begging for a refactor!

## Preface

When designing the tech stack for an e-commerce project, the web of competing priorities can start to feel like an [M. C. Escher](https://mcescher.com/) painting.

Online stores directly drive revenue through their site, making conversion rates a top priority. That often leads to the need for realtime tracking and user-specific product recommendations. Cool! We know we'll need a backend feeding the frontend realtime data.

What happens, though, when your marketing campaign goes viral and site traffic takes off like a rocket? Wait a second, so is this when we're supposed to reach for cloud-based autoscaling? Or a serverless solution?

## The benefits of Jamstack

Static sites aren't a one size fits all solution, but they have some very real benefits especially at smaller scales. It seems crazy to use a static site for an online store though...right?

I'd argue that a vast majority of online shops could see huge benefits if they switched to a static setup. Their store is always available, fast, and easily indexed by Google. Most importantly, if their next Instagram post goes viral the rush of shoppers won't take down their site and throw away all those potential sales.

### Enter Snipcart

We have used [Snipcart](https://snipcart.com) on quite a few projects over the years, including [Kamfly](https://kamfly.io) and been extremely happy with the results.

Snipcart is a drop-in shopping cart solution complete with support for subscriptions and digital goods. Their admin dashboard gives you easy access to customer and product analytics, inventory management, abandoned cart re-engagement campaigns, and even supports multiple currencies and tax solutions.

Even better, Snipcart discovers your product details right from your HTML. You include `data-` attributes defining things like a product's price and options and Snipcart handles the rest. And don't worry, Snipcart verifies all product details before accepting an order to make sure there wasn't any funny business.

## Static e-commerce with Astro

Enough already, lets get to the solution! Fair warning, this demo is a fairly direct port from [Kamfly's demo](https://demo.kamfly.io). That project was originally written in [11ty](https://11ty.dev), another static site generator that provides an excellent developer experience for fans of JavaScript.

The UI design of the demo menu may look familiar to a few of you reading this. My first job out of college was as a Software Development Engineer in Test (SDET) at [Microsoft](https://microsoft.com). I worked on the UI team responsible for Windows Phone 7-10 and was always partial to the subway-inspired design!

### Loading the menu data

I didn't want to stray too far from the original 11ty project, and that meant storing all the menu data in local JSON files.

You can see the full details [in GitHub](https://github.com/Navillus-BV/demo-astro-snipcart/blob/main/src/utils/loadMenu.js), but the basic solution here takes advantage of [glob imports](https://vitejs.dev/guide/features.html#glob-import).

```js
import.meta.glob('../data/menus/*.json')
```

The code above is a bit of import magic that allows you to use a [glob pattern](https://www.npmjs.com/package/glob) to load multiple files at once.

With `import.meta.glob` the result is an object mapping from filename to an async function that loads the file. In case you want to load all the data immediately, `import.meta.globEager` will be your best friend.

### Adding the shopping cart button

Snipcart makes this extremely simple.

```html
<button class="header__cartbtn snipcart-checkout">
  <img class="header__cart" src="/icons/cart.svg" alt="open cart" />
  <span class="snipcart-items-count header__cartcount">0</span>
</button>
```

That's all there is to it! Snipcart checks your page for a specific classes. In this case `snipcart-checkout` tells Snipcart this is the button that should open the shopping cart when clicked. The `.snipcart-items-count` span is another special class telling Snipcart to update this span with the current number of items in the cart.

### Adding products to the cart

Snipcart looks for another special class to discover products on your site, `snipcart-add-item`.

```astro
<button
    class="menuitem__cartbtn snipcart-add-item"
    data-item-id={item.slug}
    data-item-name={item.display_title || item.title}
    data-item-price={item.price}
    data-item-url={url}
    data-item-image={item.image}
    {...modifiersMap}
>
```

Most of this should be pretty straight forward, we're adding `data-item` properties to tell Snipcart what the product is. But what about that `modifiersMap` thing?

### Snipcart custom fields

Snipcart allows you to add custom options to products, think dropdowns for `size: Medium` or `color: Gray`. To do this their API supports [custom fields](https://docs.snipcart.com/v3/setup/products#custom-fields).

The string formatting for custom fields can be a bit confusing at first glance, but it's hugely powerful. Not only can you tell Snipcart what options are available, you can even define extra charges for specific options.

```html
<button
  ...
  data-item-custom1-name="Frame color"
  data-item-custom1-options="Black|Brown[+100.00]|Gold[+300.00]"
>
  ...
</button>
```

In this case, Snipcart would give the user a dropdown option for "Frame color". The color black is free, upgrading to brown adds $100 to the product's price and upgrading to gold adds $300.

#### Adding custom fields in Astro

This one was a bit tricky to figure out at first, hopefully I'll help save you some time here.

I realized pretty quickly that the `{...spread}` operator was going to be my friend. Because [Astro](https://astro.build) allows JavaScript (and TypeScript!) inside the template's `---` fence, it really is just a matter of massaging the product options into an object.

```json
const modifierMap = {
    "data-item-custom1-name": "Sauce",
    "data-item-custom1-options": "None|BBQ|Buffalo",
    "data-item-custom2-name": "Side",
    "data-item-custom2-options": "Fries|Onion Rings[+1.50]"
}
```

I'll leave it to you to check the [full implementation](https://github.com/Navillus-BV/demo-astro-snipcart/blob/main/src/components/MenuItem.astro) in GitHub, but once we have the map of option properties it really is as simple as `{...spread}`ing those properties onto the `<button>` in Astro.

## Conclusion

A huge thanks is in order here to both the [Snipcart](https://snipcart.com) and [Astro](https://astro.blog) teams here. I had the easy job of tying together two excellent projects to build a completely static restaurant ordering site!
