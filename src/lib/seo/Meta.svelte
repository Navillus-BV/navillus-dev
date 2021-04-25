<script lang="ts">
	import shareImage from '$assets/navillus-share.png';

	export let title = 'Navillus: Jamstack developers for hire';
	export let description =
		'Lightning fast, secure, and SEO-friendly websites, web apps, and e-commerce. If that’s what you’re looking for - we’re the devs for you.';
	export let image = shareImage;
</script>

<svelte:head>
	<title>{title} | Navillus</title>
	<meta property="og:title" content="{title} | Navillus" />
	<meta property="twitter:title" content="{title} | Navillus" />
	<meta property="og:site_name" content={title} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<meta property="og:image" content={image} />
	<meta name="twitter:image" content={image} />
</svelte:head>
