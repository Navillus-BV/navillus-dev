<script lang="ts">
	import Blogging from '$lib/icons/Blogging.svelte';
	import Money from '$lib/icons/Money.svelte';
	import PWA from '$lib/icons/PWA.svelte';
	import Shield from '$lib/icons/Shield.svelte';
	import Shopping from '$lib/icons/Shopping.svelte';
	import Speedometer from '$lib/icons/Speedometer.svelte';

	import {
		Contentful,
		Dato,
		Forestry,
		Netlify as NetlifyCMS,
		Prismic,
		Sanity,
		Storyblok,
		Strapi
	} from '$lib/logos/cms';
	import {
		Eleventy,
		Gatsby,
		Gridsome,
		Hugo,
		Jekyll,
		NextJS,
		NuxtJS,
		Sapper,
		SvelteKit
	} from '$lib/logos/ssg';
	import {
		AWS,
		Azure,
		Begin,
		CloudflarePages,
		Firebase,
		Netlify,
		Render,
		Vercel
	} from '$lib/logos/hosting';

	const headlessCms = [Contentful, Dato, Forestry, NetlifyCMS, Prismic, Sanity, Storyblok, Strapi];
	const ssg = [Eleventy, Gatsby, Gridsome, Hugo, Jekyll, NextJS, NuxtJS, Sapper, SvelteKit];
	const hosts = [AWS, Azure, Begin, CloudflarePages, Firebase, Netlify, Render, Vercel];
</script>

<section>
	<div class="container hero">
		<h1>
			Every problem is <strong>different</strong>.
			<br />
			Your <strong>solutions</strong> should be too.
		</h1>
		<p>
			Maximize your business potential with performant websites built with the latest, innovative
			technologies.
		</p>
		<a class="btn" href="/services">How we can help</a>
	</div>
</section>

<section class="alt">
	<div class="container">
		<h3 class="text-sm bold">SITES WITH BENEFITS</h3>
		<h2>How Jamstack supports your business</h2>

		<div class="features">
			<div class="feature">
				<Speedometer foreground="var(--color-red)" />

				<h4 class="feature__title">Better Performance</h4>
				<p>
					Why wait for pages to build on the fly when you can generate them at deploy time? When it
					comes to minimizing the time to first byte, nothing beats pre-built files served over a
					CDN.
				</p>
			</div>
			<div class="feature">
				<Shield foreground="var(--color-blue)" />

				<h4 class="feature__title">Higher Security</h4>
				<p>
					Why wait for pages to build on the fly when you can generate them at deploy time? When it
					comes to minimizing the time to first byte, nothing beats pre-built files served over a
					CDN.
				</p>
			</div>
			<div class="feature">
				<Money foreground="var(--color-green)" />

				<h4 class="feature__title">Cheaper, Easier Scaling</h4>
				<p>
					When your deployment amounts to a stack of files that can be served anywhere, scaling is a
					matter of serving those files in more places. CDNs are perfect for this, and often include
					scaling in all of their plans.
				</p>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="container">
		<h3 class="text-sm bold">TECHNOLOGY WE USE</h3>
		<h2>Building the Modern Web</h2>

		<div class="badges">
			<h4 class="text-sm bold">HEADLESS CMS</h4>

			<ul>
				{#each headlessCms as item, i (i)}
					<li>
						<svelte:component this={item} class="color-text fill-current" />
					</li>
				{/each}
			</ul>
		</div>

		<div class="badges">
			<h4 class="text-sm bold">STATIC SITE GENERATOR</h4>

			<ul>
				{#each ssg as item, i (i)}
					<li>
						<svelte:component this={item} class="color-text fill-current" />
					</li>
				{/each}
			</ul>
		</div>

		<div class="badges">
			<h4 class="text-base bold">DEPLOYMENT PLATFORMS</h4>

			<ul>
				{#each hosts as item, i (i)}
					<li>
						<svelte:component this={item} class="color-text fill-current" />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="alt">
	<div class="container">
		<h3 class="text-sm bold">PRODUCTS WE CRAFT</h3>
		<h2>Our Services</h2>

		<div class="features">
			<div class="feature">
				<PWA foreground="var(--color-red)" />

				<h4 class="feature__title">Progressive Web Apps</h4>
				<p>
					Save time and money with a progressive web app instead of native apps for multiple
					platforms. Jamstack PWA means great performance and low hosting costs.
				</p>
			</div>
			<div class="feature">
				<Blogging foreground="var(--color-blue)" />

				<h4 class="feature__title">Static Websites</h4>
				<p>
					Get new customers with a faster website with higher SEO chances. We build them with proven
					technologies: GatsbyJS, Hugo, Netlify, and many others.
				</p>
			</div>
			<div class="feature">
				<Shopping foreground="var(--color-green)" />

				<h4 class="feature__title">eCommerce Stores</h4>
				<p>
					Every second matters for online shoppers. There are no trade-offs between security,
					performance and personalised experiences with Jamstack eCommerce solutions.
				</p>
			</div>
		</div>
	</div>
</section>
