---
title: Blog Post 1
excerpt: How did it work?
published_date: 2021-05-04
---

``` js
function sayHello() {
    console.log('Hello, world!')
}
```

``` svelte
<script lang="ts">
    let numbers = [0, 1, 2]
</script>

{#each numbers as number}
    <article>{number}</article>
{/each}
```