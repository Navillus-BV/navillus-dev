---
title: Introducing svelte-entity-store
description: A (work-in-progress) generic entity store for Svelte projects.
social_image: '/uploads/2021-05-01-introducing-svelte-entity-store.jpg'
date: '2021-05-01T17:38:44Z'
tags:
  - svelte
  - intro
permalink: '/blog/introducing-svelte-entity-store'
published: true
last_modified_at: '2021-06-05T00:00:00Z'
blocks: []
tweet_id: ''
author: src/data/authors/tony-sull.json
---

A (**w**ork-**i**n-**p**rogress) generic entity store for Svelte projects.

Check out the [repo](https://github.com/tony-sull/svelte-entity-store/) for details.

## Why?

This is ultimately just a [custom store](https://svelte.dev/examples#custom-stores) built on top of [svelte/store](https://svelte.dev/docs#svelte_store). Like the rest of Svelte, the built in stores are excellent building blocks that aim to give you all the tools you need without trying to solve every single scenario out of the box.

The goal with `svelte-entity-store` is to provide a simple, generic solution for storing collections of entity objects. Throwing an array of items into a basic `writable` store doesn't scale well if you have a lot of items and need to quickly find or update one item in the store.

## Install

```bash
npm i -s svelte-entity-store
```

## Usage

> Check out [/examples](https://github.com/tony-sull/svelte-entity-store/tree/main/examples/todomvc) for a working TodoMVC demo based on SvelteKit. More to come!

```ts
<script lang="ts">
  import { entityStore } from 'svelte-entity-store'

  // Define your entity interface
  interface TodoItem {
    id: string
    description: string
    completed: boolean
  }

  // Write a getter function that returns the ID of an entity (can be inlined in the constructor also)
  // Currently number and string values are valid IDs
  const getId = (todo: TodoItem) => todo.id

  // Initialize the store
  // (optional) the constructor accepts an Array as a second param
  //            ex: if you rehydrate state from localstorage
  const store = entityStore<TodoItem>(getId)

  // Get a derived store for every active todo
  const activeTodos = store.get((todo) => todo.completed)

  // toggle a todo
  function toggle(id: string) {
    store.update((todo) => ({ ...todo, completed: !todo.completed }), id)
  }

  // clear completed todos
  function clearCompleted() {
    store.remove((todo) => todo.completed)
  }
</script>

{#each $activeTodos as todo (todo.id) }
  // ... render your UI as usual
{/each}
```

### Creating the Store

Creating an instance of the store is pretty straight forward. Svelte has excellent [TypeScript support](https://svelte.dev/blog/svelte-and-typescript) these days, but it isn't a must. Using `svelte-entity-store` in plain old JavaScript is very similar, just skip the `interface` definition and `<Type>` casting.

```ts
import { entityStore } from 'svelte-entity-store'

// Define your entity interface
interface TodoItem {
  id: string
  description: string
  completed: boolean
}

// Write a getter function that returns the ID of an entity (can be inlined in the constructor also)
// Currently number and string values are valid IDs
const getId = (todo: TodoItem) => todo.id

// Initialize the store
// (optional) the constructor accepts an Array as a second param
//            ex: if you rehydrate state from localstorage
const store = entityStore<TodoItem>(getId)
```

Nothing to crazy there so far. For TypeScript we define the model `interface`, you could also use `type` if that's your thing. The store also needs to know how to get unique IDs for each item. Right now `string` and `number` IDs are supported, but this may be extended later.

#### Need initial state?

No problem! The store accepts an optional second parameter.

```ts
const items = [
  // ... array of TodoItem's to populate the store with
]
const store = entityStore<TodoItem>(getId, items)
```

Pass in an array of initial items to avoid having to call `store.set(items)` immediately. This is particularly handy if you are rehydrating the store from cache or localstorage, similar to the [TodoMVC example](https://github.com/tony-sull/svelte-entity-store/tree/main/examples/todomvc).

### Subscribing to entities

The store's `get()` methods return [readable stores](https://svelte.dev/docs#readable) to access the entities. The `get()` method has multiple overrides to serve different uses like grabbing a single entity, filtered list of entities, or everything in the store.

Properly overriding methods in TypeScript was an interesting challenge to get autocorrect and similar tooling to work properly. It's too much to go into here but should turn into a blog post of its own soon.

```ts
// Get one entity by ID
const item = store.get('abc-123')

// Get a list of entities by ID
const items = store.get([123, 456, 789])

// Get a list of entities that match a filter function
const activeItems = store.get((todo) => !todo.completed)

// Or get every entity in the store
const allItems = store.get()
```

Because the store is returning [derived stores](https://svelte.dev/docs#derived), the full power of Svelte's [reactivity](https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values) model just works.

```ts
<script lang="ts">
  // Create a computed property based on the get() results
  $: activeItemsCount = $activeItems.count
</script>

// Directly access a single entity
<h1>{$item.title}</h1>

// Or loop over multiple entities
<ul>
  {#each $allItems as item (item.id)}
    <li class:completed={item.completed}>
      {item.title}
    </li>
  {/each}
</ul>
```

### Updating the store

Much like `get()`, `set()` has a few different overrides. Calling `set` will blow away any old entity state, if you need to keep some of the old entities' state check out `update()` instead (below).

```ts
// Replace the existing entity with ID 123, or add it if the ID doesn't exist yet
store.set({
  id: 123,
  description: 'Todo #1',
  completed: true,
})

// Or add/replace multiple todos at once
store.set([
  // ... multiple todo objects
])
```

Sometimes you just need to change part of an entity without worrying about the entire object. `update()` solves this, it should look very [familiar](https://svelte.dev/docs#writable).

```ts
function toggleTodo(todo: TodoItem) {
  return {
    ...todo,
    completed: !todo.completed,
  }
}

// Update a single entity by ID
store.update(toggleTodo, 123)

// In case you already have the entity object and don't want to call getId,
store.update(toggleTodo, todoObj)

// The same goes for lists of IDs or entities
store.update(toggleTodo, [123, 456])
store.update(toggleTodo, $activeTodos)

// What if you want to only update entities that meet a filter condition?
store.update(toggleTodo, (todo) => todo.completed)

// Go crazy with it and run the update against every entity in the store
store.update(toggleTodo)
```

### Removing entities

Removing will look very similar to `update()`

```ts
// You can remove single entities by ID
store.remove(123)

// By list of IDs
store.remove([123, 456])

// Or remove every item that matches a filter
const isCompleted = (todo) => todo.completed)
store.remove(isCompleted)
```

Writing the examples here for `update` and `remove`, I realized there's no reason that `remove` shouldn't let you pass in the entity objects similar to `update`. Time for a [github issue](https://github.com/tony-sull/svelte-entity-store/issues/1).

## Fully tested

I went a little overboard trying out a few new (to me) CI and testing tools. On the plus side, the `v1.0.0` of store has 100% test coverage and a working [TodoMVC example](https://github.com/tony-sull/svelte-entity-store/tree/main/examples/todomvc).

All testing is done with [lukeed](https://github.com/lukeed/)'s excellent [uvu](https://github.com/lukeed/uvu) test framework. I've mostly reached for [Jest](https://jestjs.io/) the last few years but I don't think I'll be turning back. `uvu` was simple to setup and it really does fly compared to other testing frameworks.

Take a peek at some of the `svelte-entity-store` [tests](https://github.com/tony-sull/svelte-entity-store/tree/main/tests). It was particularly interesting figuring out a clean way to store subscriptions, i.e. to make sure subscribers get updated state or that subscribers aren't called if an API call didn't actually change the store at all.

## Missing features

I purposely didn't add sorting support for v1.0. It can be done without too much headache...

```ts
const allItems = store.get()
$sortedItems = $allItems.sort((a, b) => (a < b ? 1 : -1))
```

but ideally that's built right into the store itself. There's an [issue](https://github.com/tony-sull/svelte-entity-store/issues/2) tracking sorting functionality, the best solution is probably to add an optional `sort` parameter to all `get()` overloads.

### What else?

What'd I miss? File [issues](https://github.com/tony-sull/svelte-entity-store/issues) for feature requests!
