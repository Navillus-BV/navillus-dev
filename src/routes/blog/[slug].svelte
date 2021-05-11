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
	import Meta from '$lib/seo/Meta.svelte';
	import { blogPostSchema } from '$utils/json-ld';
	import './prism-hopscotch.postcss';

	export let post: MarkdownData<BlogPostData>;
</script>

<LDTag schema={blogPostSchema(post)} />
<Meta title={post.attributes.title} description={post.attributes.description} />

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
				<time class="text-sm" datetime={post.attributes.published_date}>
					{post.attributes.published_date}
				</time>
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

		& :global(h1) {
			font-size: clamp(var(--text-2xl), 8vw, var(--text-4xl));
		}

		& :global(h2) {
			font-size: clamp(var(--text-xl), 6vw, var(--text-3xl));
		}

		& :global(h3) {
			font-size: clamp(var(--text-lg), 5vw, var(--text-2xl));
		}

		& :global(h4) {
			font-size: clamp(var(--text-base), 5vw, var(--text-xl));
		}

		& :global(a) {
			color: var(--color-link);
			text-decoration: underline;
		}
	}
</style>
