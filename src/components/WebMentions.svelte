<script>
  import Avatar from "./Avatar.svelte";
  import WebMentionReply from "./WebMentionReply.svelte";
  import { isMentionType } from "../utils/mentions.js";
  import site from "../data/site.json";

  export let webmentions;
  export let url;

  const reposts = webmentions.filter(isMentionType("repost-of"));
  const likes = webmentions.filter(isMentionType("like-of"));
  const replies = webmentions.filter(isMentionType("in-reply-to"));
</script>

<h2 class="h3">Webmentions</h2>

{#if likes.length}
  <div class="facepile">
    <h3 class="h4">{likes.length} Like{likes.length > 1 ? "s" : ""}</h3>

    {#each likes as mention}
      {#if mention.url}
        <a href={mention.url} target="_blank" rel="noopener noreferrer">
          <Avatar src={mention.author.photo} alt={mention.author.name} />
        </a>
      {:else}
        <Avatar src={mention.author.photo} alt={mention.author.name} />
      {/if}
    {/each}
  </div>
{/if}

{#if reposts.length}
  <div class="facepile">
    <h3 class="h4">{reposts.length} Repost{likes.length > 1 ? "s" : ""}</h3>

    {#each reposts as mention}
      {#if mention.url}
        <a href={mention.url} target="_blank" rel="noopener noreferrer">
          <Avatar src={mention.author.photo} alt={mention.author.name} />
        </a>
      {:else}
        <Avatar src={mention.author.photo} alt={mention.author.name} />
      {/if}
    {/each}
  </div>
{/if}

{#if replies.length}
  <div>
    <h3 class="h4">
      {replies.length}
      {replies.length === 1 ? "Reply" : "Replies"}
    </h3>

    {#each replies as mention}
      <WebMentionReply {mention} />
    {/each}
  </div>
{/if}

<div class="webmentions__form">
  <p class="h5">
    These are <a href="https://indieweb.org/Webmention">webmentions</a> via the
    <a href="https://indieweb.org/">IndieWeb</a>
    and
    <a href="https://webmention.io/">webmention.io</a>. Mention this post from
    your site:
  </p>
  <form
    action="https://webmention.io/{site.domain}/webmention"
    method="post"
    class="form-webmention"
  >
    <label for="form-webmention-source">URL</label>
    <input
      id="form-webmention-source"
      type="url"
      name="source"
      placeholder="https://example.com"
      required=""
    />
    <input type="hidden" name="target" value={url} />
    <input type="submit" class="button button-small" value="Send Webmention" />
  </form>
</div>

<style>
  h2 {
    margin-bottom: 0;
  }

  h3 {
    width: 100%;
    color: var(--chisel-secondary);
    font-weight: 500;
    margin: var(--spacer-md) 0 var(--spacer-xs);
  }

  .facepile {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacer-xs);
    margin: 0;
  }

  .facepile a {
    text-decoration: none;
  }
  .facepile a:hover :global(img) {
    filter: var(--shadow-secondary);
  }

  .webmentions__form {
    margin-top: var(--spacer-lg);
  }
</style>
