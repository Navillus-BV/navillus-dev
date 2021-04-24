<script>
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../app.postcss';
</script>

<Nav />

<main>
	<slot />
</main>

<Footer />
