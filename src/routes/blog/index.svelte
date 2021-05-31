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
		<h1 class="h6"><strong>JAMSTACK DEVELOPERS FOR HIRE</strong></h1>
		<h2 class="h1">The Navillus Blog</h2>
		<p>Exploring the Jamstack and the future of web development.</p>
	</div>
</section>

<section class="alt">
	<div class="container">
		<h2 class="h6"><strong>ALL POSTS</strong></h2>

		{#each posts as post, i (post.slug)}
			<article>
				<a href="/blog/{post.slug}">
					<h3 class="underline" class:mt-0={i === 0}>{post.title}</h3>
				</a>
				<p>{post.description}</p>
				<time class="h6" datetime={post.published_date}>{post.published_date}</time>
			</article>
		{/each}
	</div>
</section>

<style style lang="postcss">
	article {
		&:not(:first-of-type) {
			margin-top: var(--spacer-lg);
		}

		& h3,
		& p {
			margin-bottom: var(--spacer-tiny);
		}

		& a {
			color: inherit;
		}
	}
</style>
