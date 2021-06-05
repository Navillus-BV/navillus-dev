<script lang="ts">
	import site from '$data/site.json';

	const { id, domain } = site.analytics.fathom;
</script>

<svelte:head>
	<!-- Fathom - beautiful, simple website analytics -->
	<script
		src="https://cdn.usefathom.com/script.js"
		data-spa="auto"
		data-site={id}
		data-included-domains={domain}
		defer></script>
	<!-- / Fathom -->
</svelte:head>
