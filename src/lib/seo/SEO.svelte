<script lang="ts">
	import { page } from '$app/stores';
	import Meta from './Meta.svelte';

	const title = 'Navillus: Jamstack developers for hire';
	const description =
		'Lightning fast, secure, and SEO-friendly websites, web apps, and e-commerce. If that’s what you’re looking for - we’re the devs for you.';

	$: url = `https://navillus.dev${$page.path}`;
</script>

<svelte:head>
	<Meta {title} {description} />

	<meta
		name="keywords"
		content="web development, consulting, jamstack, serverless, static site, netlify, svelte, software, engineering, software engineering, api development"
	/>

	<meta name="robots" content="index,follow" />
	<meta name="author" content="Navillus.dev" />

	<link rel="canonical" href={url} />
	<meta property="og:url" content={url} />
	<meta name="twitter:url" content={url} />

	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="navillus_dev" />
	<meta name="twitter:creator" content="navillus_dev" />
</svelte:head>
