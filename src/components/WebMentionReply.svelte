<script>
  import Avatar from "./Avatar.svelte";
  import { formatDate } from "../utils/formatDate";

  export let mention;
</script>

<article id="webmention-{mention['wm-id']}">
  <div class="meta">
    {#if mention.author}
      <Avatar src={mention.author.photo} alt={mention.author.name} small />
      <a href={mention.url} target="_blank" rel="noreferrer noopener">
        <span>
          <strong>{mention.author.name}</strong>
        </span>
      </a>
      <time class="h6" datetime={mention.published}>
        {formatDate(mention.published)}
      </time>
    {:else}
      <strong>Anonymous</strong>
    {/if}
  </div>

  <div class="content">
    {mention.content.text}

    {#if mention.url}
      <a href={mention.url} target="_blank" rel="noopener noreferrer">
        <span>source</span>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="10px"
          ><path
            fill="currentColor"
            d="M432 320h-32a16 16 0 00-16 16v112H64V128h144a16 16 0 0016-16V80a16 16 0 00-16-16H48a48 48 0 00-48 48v352a48 48 0 0048 48h352a48 48 0 0048-48V336a16 16 0 00-16-16zM488 0H360c-21.37 0-32.05 25.91-17 41l35.73 35.73L135 320.37a24 24 0 000 34L157.67 377a24 24 0 0034 0l243.61-243.68L471 169c15 15 41 4.5 41-17V24a24 24 0 00-24-24z"
          /></svg
        >
      </a>
    {/if}
  </div>
</article>

<style>
  article {
    padding: var(--spacer-sm);
    background: var(--chisel-neutral-200);
  }

  article:not(:last-of-type) {
    margin-bottom: var(--spacer-md);
  }

  .meta {
    display: flex;
    flex-direction: row;
    gap: var(--spacer-xs);
    align-items: center;
  }

  .meta a {
    margin-top: 0;
  }

  .meta strong {
    font-weight: 500;
  }

  .meta time {
    flex: 1 0 0%;
    text-align: end;
    margin-top: 0;
  }

  .content a {
    font-size: 0.875em;
    margin-left: var(--spacer-xs);
  }

  .content a svg {
    margin-left: var(--spacer-tiny);
  }
</style>
