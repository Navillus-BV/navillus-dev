<script lang="ts">
	import ContactForm from '$lib/ContactForm.svelte';
	import Blogging from '$lib/icons/Blogging.svelte';
	import Money from '$lib/icons/Money.svelte';
	import PWA from '$lib/icons/PWA.svelte';
	import Shield from '$lib/icons/Shield.svelte';
	import Shopping from '$lib/icons/Shopping.svelte';
	import Speedometer from '$lib/icons/Speedometer.svelte';

	const headlessCMS = [
		{
			logo: 'logos/contentful.svg',
			title: 'Contentful'
		},
		{
			logo: 'logos/dato.svg',
			title: 'Dato CMS'
		},
		{
			logo: 'logos/forestry.svg',
			title: 'Forestry'
		},
		{
			logo: 'logos/netlify-cms.svg',
			title: 'Netlify CMS'
		},
		{
			logo: 'logos/prismic.svg',
			title: 'Prismic'
		},
		{
			logo: 'logos/sanity.svg',
			title: 'Sanity.io'
		},
		{
			logo: 'logos/storyblok.svg',
			title: 'Storyblok'
		},
		{
			logo: 'logos/strapi.svg',
			title: 'Strapi'
		}
	];

	const ssg = [
		{
			logo: 'logos/11ty.svg',
			title: '11ty'
		},
		{
			logo: 'logos/gatsby.svg',
			title: 'Gatsby'
		},
		{
			logo: 'logos/gridsome.svg',
			title: 'Gridsome'
		},
		{
			logo: 'logos/hugo.svg',
			title: 'Hugo'
		},
		{
			logo: 'logos/jekyll.svg',
			title: 'Jekyll'
		},
		{
			logo: 'logos/nextjs.svg',
			title: 'NextJS'
		},
		{
			logo: 'logos/nuxtjs.svg',
			title: 'NuxtJS'
		},
		{
			logo: 'logos/scully.svg',
			title: 'Scully'
		},
		{
			logo: 'logos/sapper.svg',
			title: 'Sapper'
		},
		{
			logo: 'logos/sveltekit.svg',
			title: 'SvelteKit'
		}
	];

	const hosts = [
		{
			logo: 'logos/aws.svg',
			title: 'AWS'
		},
		{
			logo: 'logos/azure.svg',
			title: 'Azure'
		},
		{
			logo: 'logos/begin.svg',
			title: 'Begin.com'
		},
		{
			logo: 'logos/cloudflare-pages.svg',
			title: 'Cloudflare Pages'
		},
		{
			logo: 'logos/digital-ocean.svg',
			title: 'Digital Ocean'
		},
		{
			logo: 'logos/firebase.svg',
			title: 'Firebase'
		},
		{
			logo: 'logos/netlify.svg',
			title: 'Netlify'
		},
		{
			logo: 'logos/render.svg',
			title: 'Render'
		},
		{
			logo: 'logos/vercel.svg',
			title: 'Vercel'
		}
	];
</script>

<section>
	<div class="container">
		<h1 class="text-sm bold mt-0">JAMSTACK DEVELOPERS FOR HIRE</h1>
		<h2 class="text-4xl mt-0">
			Every problem is <strong>different</strong>.
			<br />
			Your <strong>solutions</strong> should be, too.
		</h2>
		<p>
			We specialize in Jamstack technologies to build simple solutions to complex business needs.
			Grow your business, not your servers.
		</p>
		<a class="btn" href="/#services">How we can help</a>
	</div>
</section>

<section class="alt">
	<div class="container">
		<h2 class="text-sm bold">SITES WITH BENEFITS</h2>
		<h3 class="text-3xl mt-0">Why use the Jamstack?</h3>

		<div class="features">
			<article>
				<Speedometer foreground="var(--color-red)" />

				<div>
					<h4 class="text-xl">Better Performance</h4>
					<p>
						47% of Users expect a maximum of 2 seconds loading time for an average website. When it
						comes to minimizing the time to first byte, nothing beats pre-built files served over a
						CDN.
					</p>
				</div>
			</article>
			<article>
				<Shield foreground="var(--color-blue)" />

				<div>
					<h4 class="text-xl">Higher Security</h4>
					<p>
						73.2% of the most popular WordPress installations are open to vulnerabilities.
						Statically rendered websites with no plugins are a fortress, protecting your customers
						and your business.
					</p>
				</div>
			</article>
			<article>
				<Money foreground="var(--color-green)" />

				<div>
					<h4 class="text-xl">Cheaper, Easier Scaling</h4>
					<p>
						When your deployment amounts to a stack of files that can be served anywhere, scaling is
						a matter of serving those files in more places. Content Delivery Networks (CDNs) are
						perfect for this, and often include scaling in all of their plans.
					</p>
				</div>
			</article>
		</div>
	</div>
</section>

<section>
	<div class="container">
		<h2 class="text-sm bold">TECHNOLOGY WE USE</h2>
		<h3 class="text-3xl mt-0">Building the Modern Web</h3>

		<div class="badges">
			<h4 class="text-sm bold">HEADLESS CMS</h4>

			<ul>
				{#each headlessCMS as { logo, title } (title)}
					<li>
						<img loading="lazy" class="badge__icon" src={logo} alt={title} />
					</li>
				{/each}
			</ul>
		</div>

		<div class="badges">
			<h4 class="text-sm bold">STATIC SITE GENERATOR</h4>

			<ul>
				{#each ssg as { logo, title }, i (i)}
					<li>
						<img loading="lazy" class="badge__icon" src={logo} alt={title} />
					</li>
				{/each}
			</ul>
		</div>

		<div class="badges">
			<h4 class="text-sm bold">DEPLOYMENT PLATFORMS</h4>

			<ul>
				{#each hosts as { logo, title }, i (i)}
					<li>
						<img loading="lazy" class="badge__icon" src={logo} alt={title} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="alt" id="services">
	<div class="container">
		<h2 class="text-sm bold">WHAT WE OFFER</h2>
		<h3 class="text-3xl mt-0">Our Services</h3>

		<div class="features">
			<article>
				<PWA foreground="var(--color-red)" />

				<div>
					<h4 class="text-xl">Progressive Web Apps</h4>
					<p>
						Save time and money with a progressive web app instead of native apps for multiple
						platforms. Jamstack PWA means great performance and low hosting costs.
					</p>
				</div>
			</article>
			<article>
				<Blogging foreground="var(--color-blue)" />

				<div>
					<h4 class="text-xl">Static Websites</h4>
					<p>
						Static doesn't mean boring. We design and build sites with proven technologies to offer
						dynamic, interactive designs that customers love.
					</p>
				</div>
			</article>
			<article>
				<Shopping foreground="var(--color-green)" />

				<div>
					<h4 class="text-xl">eCommerce Stores</h4>
					<p>
						Every second matters for online shoppers. There are no trade-offs between security,
						performance and personalised experiences with Jamstack eCommerce solutions.
					</p>
				</div>
			</article>
		</div>
	</div>
</section>

<section id="contact">
	<div class="container">
		<h2 class="text-sm bold">JAMSTACK DEVELOPERS FOR HIRE</h2>
		<h3 class="text-3xl mt-0">Ready to join the Jamstack revolution?</h3>
		<p>
			Reach out! We'd be happy to answer any questions you may have about the Jamstack or jump right
			into talking more about your needs and what the right solution for your business might be.
		</p>
		<ContactForm />
	</div>
</section>
