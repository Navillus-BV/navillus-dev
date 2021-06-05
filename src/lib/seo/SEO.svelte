<script lang="ts">
	import { page } from '$app/stores';
	import site from '$data/site.json';

	export let title = 'Jamstack Developers for Hire';
	export let description =
		"We specialize in finding simple solutions to complex software problems. We value data-driven decisions and accessibility over this month's latest tech trends.";
	export let image = '/share.png';

	$: url = `${site.url}${$page.path}`;
	$: imageAbsolute = `${site.url}${image}`;

</script>

<svelte:head>
	<title>{title} • Navillus</title>
	<meta name="description" content={description} />
	<meta
		name="keywords"
		content="web development, consulting, jamstack, serverless, static site, netlify, svelte, software, engineering, software engineering, api development"
	/>
	<meta name="robots" content="index,follow" />
	<meta name="author" content={site.author} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageAbsolute} />
	<meta property="og:url" content={url} />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageAbsolute} />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:card" content={site.social.twitter_card} />
	<meta name="twitter:site" content={site.social.twitter} />
	<meta name="twitter:creator" content={site.social.twitter} />
</svelte:head>
