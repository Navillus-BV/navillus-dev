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
	import Meta from '$lib/seo/Meta.svelte';

	export let post: PageData<BlogPostData>;
</script>

<Meta title={post.attributes.title} description={post.attributes.excerpt} />

<article>
	<div class="container">
		{@html post.html}
	</div>
</article>
