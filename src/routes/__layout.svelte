<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import LDTag from '$lib/seo/LDTag.svelte';
	import { organizationSchema, websiteSchema } from '$utils/json-ld';
	import '../app.postcss';

</script>

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
