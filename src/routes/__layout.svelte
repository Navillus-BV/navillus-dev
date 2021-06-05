<script lang="ts">
	import { dev } from '$app/env';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import Analytics from '$lib/seo/Analytics.svelte';
	import LDTag from '$lib/seo/LDTag.svelte';
	import { organizationSchema, websiteSchema } from '$utils/json-ld';
	import '../app.postcss';
</script>

{#if !dev}
	<Analytics />
{/if}

<LDTag schema={organizationSchema} />
<LDTag schema={websiteSchema} />

<Nav />

<main>
	<slot />
</main>

<Footer />

<style style lang="postcss">
	main {
		margin-top: 0;
	}
</style>
