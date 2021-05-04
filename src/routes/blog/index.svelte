<script lang="ts" context="module">
	export async function load({ fetch }) {
		const url = `/blog.json`;
		const res = await fetch(url);

		if (res.ok) {
			const { posts } = await res.json();
			return {
				props: {
					posts
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

	export let posts: BlogPostData[];
</script>

<Meta title="Blog" />

<h1>Blog Posts</h1>

{#each posts as post (post.slug)}
	<a href="/blog/{post.slug}" alt={post.title}>
		<article>
			<h2>{post.title}</h2>
		</article>
	</a>
{/each}
