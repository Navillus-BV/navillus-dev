<script lang="ts">
	import { page } from '$app/stores';
	import site from '$data/site.json';
	import Meta from './Meta.svelte';

	const title = 'Jamstack Developers for Hire';
	const description =
		"We specialize in finding simple solutions to complex software problems. We value data-driven decisions and accessibility over this month's latest tech trends.";

	$: url = `${site.url}${$page.path}`;
</script>

<svelte:head>
	<Meta {title} {description} />

	<meta
		name="keywords"
		content="web development, consulting, jamstack, serverless, static site, netlify, svelte, software, engineering, software engineering, api development"
	/>

	<meta name="robots" content="index,follow" />
	<meta name="author" content={site.author} />

	<link rel="canonical" href={url} />
	<meta property="og:url" content={url} />
	<meta name="twitter:url" content={url} />

	<meta property="og:type" content="website" />

	<meta name="twitter:card" content={site.social.twitter_card} />
	<meta name="twitter:site" content={site.social.twitter} />
	<meta name="twitter:creator" content={site.social.twitter} />
</svelte:head>
