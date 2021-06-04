<script lang="ts">
	import site from '$data/site.json';

	export let title = 'Jamstack Developers for Hire';
	export let description =
		"We specialize in finding simple solutions to complex software problems. We value data-driven decisions and accessibility over this month's latest tech trends.";
	export let image = '/share.png';

	$: imageAbsolute = `${site.url}${image}`;

</script>

<svelte:head>
	<title>{title} • Navillus</title>
	<meta property="og:title" content="{title} | Navillus" />
	<meta property="twitter:title" content="{title} | Navillus" />
	<meta property="og:site_name" content={title} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<meta property="og:image" content={imageAbsolute} />
	<meta name="twitter:image" content={imageAbsolute} />
</svelte:head>
