<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import '../app.postcss';
</script>

<SEO />

<Nav />

<main>
	<slot />
</main>

<Footer />
