<script lang="ts">
	import ContactForm from '$lib/ContactForm.svelte';
	import Architecture from '$lib/icons/Architecture.svelte';
	import Blogging from '$lib/icons/Blogging.svelte';
	import Money from '$lib/icons/Money.svelte';
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
			We specialize in finding simple solutions to complex software problems. We value data-driven
			decisions and accessibility over this month's latest tech trends.
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
						According to <a
							class="underline color-blue"
							href="https://www.blog.google/products/admanager/increase-speed-of-your-mobile-site-wi/"
							rel="noopener"
						>
							Google</a
						>, 53% of visitors will leave a website if it takes longer than 3 seconds to load. Even
						worse, a whopping 79% of online shoppers will stay away from online stores with
						performance hiccups.
					</p>
					<p>
						Jamstack sites are built once and globally distributed - they don't depend on servers to
						rebuild the page for every visitor.
					</p>
				</div>
			</article>
			<article>
				<Shield foreground="var(--color-blue)" />

				<div>
					<h4 class="text-xl">Higher Security</h4>
					<p>
						<a class="underline color-blue" href="https://www.enablesecurity.com/" rel="noopener">
							Enable Security
						</a> found that over 70% of WordPress sites are vulnerable to hacker attacks. Chances are
						those sites secure when first built, but without regular updates and maintenance they can
						quickly fall behind and put businesses at risk.
					</p>
					<p>
						Statically built websites are distributed globally as plain old files, skipping the web
						servers to protect your customers and your business.
					</p>
				</div>
			</article>
			<article>
				<Money foreground="var(--color-green)" />

				<div>
					<h4 class="text-xl">Cheaper, Easier Scaling</h4>
					<p>
						Citrix saw an incredible <a
							class="underline color-blue"
							href="https://www.netlify.com/blog/2019/06/12/jamstack_conf-nyc-session-recap-citrix-delivers-better-ux-with-less-overhead-using-jamstack-and-netlify/"
							rel="noopener"
						>
							65% cost savings
						</a> after moving their business critical documentation sites over to Jamstack technologies.
						Their documentation sites are visited by 3.5 million users annually and provide technical
						support for all of their 15 products and related components.
					</p>
					<p>
						Because Jamstack sites are built once and served as static files, they can be
						distributed globally and available almost instantly to your customers around the world.
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
				<Blogging foreground="var(--color-blue)" />

				<div>
					<h4 class="text-xl">Web Design & Development</h4>
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
						Losing a visitor on your online shop costs your more than just impressions, it hits your
						bottom line. We build modern, accessible eCommerce stores that grow with your business.
					</p>
				</div>
			</article>
			<article>
				<Architecture foreground="var(--color-red)" />

				<div>
					<h4 class="text-xl">Software Architecture & Design</h4>
					<p>
						Whether you already have a development team or are still in the planning phase, we can
						help you design your tech stack.
					</p>
				</div>
			</article>
		</div>
	</div>
</section>

<section id="contact">
	<div class="container">
		<h2 class="text-sm bold">JAMSTACK DEVELOPERS FOR HIRE</h2>
		<h3 class="text-3xl mt-0">Get in Touch</h3>
		<p>
			We love what we do and are always up for an interesting conversation, whether you're ready to
			get started or just have a few questions.
		</p>
		<ContactForm />
	</div>
</section>
