<script lang="ts">
	import Meta from '$lib/seo/Meta.svelte';
	import { attributes, html } from '$data/pages/terms.md';

	const title = attributes.title as string;
	const last_updated = attributes.last_updated as string;
	const lastUpdated = last_updated && new Date(last_updated).toDateString();
</script>

<Meta {title} />

<section class="alt">
	<div class="container">
		<h1>{title}</h1>

		<p class="legal__last-updated text-sm">Last Updated: {lastUpdated}</p>

		{@html html}
	</div>
</section>

<style>
	h1 {
		margin-bottom: var(--spacer-xs);
		font-size: var(--text-4xl);
	}

	.legal__last-updated {
		margin-bottom: var(--spacer-md);
	}

	section :global(li),
	section :global(p) {
		margin: var(--spacer-xs) 0;
		line-height: 1.5;
	}

	section :global(h2) {
		font-size: var(--text-3xl);
	}

	section :global(h3) {
		font-size: var(--text-2xl);
	}
</style>
