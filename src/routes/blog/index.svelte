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

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="Navillus blog" href="/blog/rss.xml" />
</svelte:head>

<Meta title="Blog" />

<section>
	<div class="container">
		<h1 class="text-sm bold mt-0">JAMSTACK DEVELOPERS FOR HIRE</h1>
		<h2 class="text-4xl mt-0">The Navillus Blog</h2>
		<p>Exploring the Jamstack and the future of web development.</p>
	</div>
</section>

<section class="alt">
	<div class="container">
		<h2 class="text-3xl">All posts</h2>

		{#each posts as post (post.slug)}
			<article>
				<a href="/blog/{post.slug}">
					<h3 class="text-xl underline">{post.title}</h3>
				</a>
				<p>{post.description}</p>
				<time class="text-sm" datetime={post.published_date}>{post.published_date}</time>
			</article>
		{/each}
	</div>
</section>

<style style lang="postcss">
	article {
		& h3,
		& p {
			margin-bottom: 0.25em;
		}
	}
</style>
