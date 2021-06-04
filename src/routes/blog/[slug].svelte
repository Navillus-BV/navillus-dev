<script lang="ts" context="module">
	export async function load({ page, fetch }) {
		const url = `/blog/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					post: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}

</script>

<script lang="ts">
	import LDTag from '$lib/seo/LDTag.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import { blogPostSchema } from '$utils/json-ld';
	import './prism-hopscotch.postcss';

	export let post: MarkdownData<BlogPostData>;

</script>

<LDTag schema={blogPostSchema(post)} />
<SEO title={post.attributes.title} description={post.attributes.description} />

<section class="alt">
	<article class="container">
		<header>
			<small>
				By
				<strong>
					{post.attributes.author.first_name}
					{post.attributes.author.last_name}
				</strong>
				•
				<time datetime={post.attributes.published_date}>
					{post.attributes.published_date}
				</time>
				{#if post.attributes.modified_date}
					<br />
					<time datetime={post.attributes.modified_date}>
						<em>Updated: {post.attributes.modified_date}</em>
					</time>
				{/if}
			</small>

			<h1>{post.attributes.title}</h1>
		</header>

		{@html post.html}
	</article>
</section>

<style style lang="postcss">
	small {
		margin-bottom: var(--spacer-sm);
	}

	.container {
		& :global(h1, h2, h3, h4) {
			margin: 1.5em 0 0.5em;
		}

		& :global(pre + p) {
			margin-top: var(--spacer-sm);
		}
	}

</style>
