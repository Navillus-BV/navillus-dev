---
title: Including json+ld structured data in Svelte
description:
  Easily add json+ld structured data to pages build in Svelte, with TypeScript
  type checking!
social_image: '/uploads/2021-05-17-json-ld-in-sveltekit.jpg'
date: '2021-05-17T17:40:47Z'
tags:
  - svelte
  - seo
permalink: '/blog/json-ld-in-sveltekit'
published: true
last_modified_at: '2021-06-05T00:00:00Z'
blocks: []
tweet_id: ''
author: src/data/authors/tony-sull.json
---

Ever wonder how Google search results include shopping results for products, or location results for local businesses? Their search bot is constantly being improved to better find that kind of content on your site, but ultimately if you care at all about SEO on your site it's important to include [structured data](https://schema.org/) on the page.

Structured data allows you to give search bots scrubbing your page a helping hand by adding metadata that describes your [business](https://schema.org/Organization), [product](https://schema.org/Product), or even your [blog posts](https://schema.org/BlogPosting).

[JSON+LD](https://json-ld.org/) is a lightweight specification for including structured data as a simple JSON object, something we're all comfortable with in the frontend world.

**tl;dr;** Check out this [Svelte REPL](https://svelte.dev/repl/3382db29fc864d60b0a4ca47b3707a95?version=3.38.2) example for a working example in JS. Keep reading to get full TypeScript validation for your Schema objects!

## JSON+LD by example

Let's take a look at a basic example first. I pulled this straight from the [JSON-LD Playground](https://json-ld.org/playground/) - it's an excellent reference for quickly messing around with the different schema and data types.

```json
{
  "@context": "http://schema.org/",
  "@type": "Person",
  "name": "Jane Doe",
  "jobTitle": "Professor",
  "telephone": "(425) 123-4567",
  "url": "http://www.janedoe.com"
}
```

Nothing crazy going on there (yet). When a search bot comes by to index a page with this JSON, it's guaranteed to find Professor Jane Doe's contact information. This contact information is probably included elsewhere on the page, say in a sidebar or page footer, but chances are the way the HTML is setup could prevent the search from connecting the link from a phone number to the person's name.

### How do you include it on a page?

This is where JSON+LD really stands out compared to other structured data formats that require special HTML attributes.

```js
<script type="application/ld+json">
	{
		"@context": "http://schema.org/",
		"@type": "Person",
		"name": "Jane Doe",
		"jobTitle": "Professor",
		"telephone": "(425) 123-4567",
		"url": "http://www.janedoe.com"
	}
</script>
```

Yep, that's really all there is to it. Wrap the JSON object in a `script` tag, mark it as a type of `application/ld+json` and you're all set. There's way more to the different kinds of schemas you may want to include - check out the [JSON-LD docs](https://json-ld.org/learn.html) for a much better walk through of all the details than I would ever fit into a single blog post.

## JSON+LD in Svelte

The beauty of [Svelte](https://svelte.dev) is how closely it follows standard web technologies. Components are written in a single file with a `script` tag for all the JavaScript, `style` tag for the component's CSS, and one or more HTML elements for the actual DOM elements.

While that makes authoring Svelte components a nearly frictionless experience for web developers, it can throw a wrench in the JSON+LD department. Tooling built for Svelte like the [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), and even the Svelte compiler itself, can cause headaches if you try to write an `application/ld+json` script in your components.

This may very well get cleaned up in the future, but for now you'll likely run into warnings and errors related to having more than one `script` tag in a component. A Google search will lead you down a rabbit hole of different combinations of Svelte's [@html](https://svelte.dev/docs#html) expressions and string literals to get it to compile.

There's a much better way to do this though, and even better it can be combined with TypeScript to add extra type validations for your JSON schema objects.

### Serialize your JSON+LD to a script

The first part of the magic trick is getting around issues related to parsing extra `script` tags in your Svelte component. This is where many will reach for some combination of `{$html}` and string literals.

I prefer to move this out of the Svelte component all together. With the logic in a plain old JavaScript file it can be unit tested and will never run into issues with tools trying to parse `.svelte` files.

```js
export function serializeSchema(thing) {
  return `<script type="application/ld+json">${JSON.stringify(thing)}</script>`
}
```

There's not much magic going on here, the function just takes in a JavaScript object and spits out the `ld+json` script tag for it.

### Type checking with TypeScript

We'll lean on the [schema-dts](https://github.com/google/schema-dts) package for full [Schema.org](https://schema.org/) type definitions.

```ts
import type { Thing, WithContext } from 'schema-dts'

export type Schema = Thing | WithContext<Thing>

export function serializeSchema(thing: Schema) {
  return `<script type="application/ld+json">${JSON.stringify(
    thing,
    null,
    2
  )}</script>`
}
```

`schema-dts` defines types for all of the different schema objects, see below for a more detailed example with an `Organization` object. This is a huge win, it's easy to accidentally structure the JSON wrong or have a typo in one of the property names. Setting it up to use TypeScript definitions we can make sure that our JSON objects are validated at build.

### Defining our Schema.org objects

Here's the `Organization` object used by this very site.

```ts
import site from `$data/site.json`;

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}#organization`,
  url: site.url,
  name: site.company.name,
  description: site.description,
  sameAs: [`https://twitter.com/${site.social.twitter}`],
  logo: `${site.url}/favicon.svg`,
};
```

Data specific to our site is pulled in from a local JSON file. This could be data exposed through a Git-based CMS like [Forestry](https://forestry.io) or pulled down from a headless CMS like [Sanity](https://sanity.io). The important thing here is that our `Organization` object is defined in TypeScript, verified at build-time, and can be unit tested if you want to make sure the `site.json` data is hooked up properly.

What is `WithContext` doing? That's a clever setup from `schema-dts`, the top-level JSON+LD object should have a `@context` property. You can nest objects though, and they even have support for using an [object graph](https://json-ld.org/spec/latest/json-ld/#dfn-graph-objects) format for multiple objects. Any nested objects, or every object in the graph, doesn't need `@context`. `WithContext` is a TypeScript wrapper for another type, in the example above I could have removed `@context` from the object and it would be a valid `Organization` type.

### Importing into Svelte

Finally, let's add the JSON+LD into the DOM. Most of our projects end up with a `LDTag.svelte` component similar to

```html
<script lang="ts">
  import { serializeSchema } from '$utils/json-ld'
  import type { Schema } from '$utils/json-ld'

  export let schema: Schema
</script>

<svelte:head>
  {@html serializeSchema(schema)}
</svelte:head>
```

Multiple Svelte components on a page can inject their own `application/ld+json` script into the document's head. This works great with [SvelteKit](https://kit.svelte.dev) too, a [layout](https://kit.svelte.dev/docs#layouts) or [route](https://kit.svelte.dev/docs#routing-pages) component could inject page-level schemas.

## Working REPL example

Take a look at our [Svelte REPL](https://svelte.dev/repl/3382db29fc864d60b0a4ca47b3707a95?version=3.38.2) example to see a full working JavaScript example.
