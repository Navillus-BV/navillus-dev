<script lang="ts">
	import ContactForm from '$lib/ContactForm.svelte';
	import featureSprites from '../assets/feature-sprites.svg';
	import toolSprites from '../assets/tool-sprites.svg';

	const headlessCMS = [
		{
			logo: `${toolSprites}#contentful`,
			title: 'Contentful'
		},
		{
			logo: `${toolSprites}#datocms`,
			title: 'Dato CMS'
		},
		{
			logo: `${toolSprites}#forestry`,
			title: 'Forestry'
		},
		{
			logo: `${toolSprites}#netlify-cms`,
			title: 'Netlify CMS'
		},
		{
			logo: `${toolSprites}#prismic`,
			title: 'Prismic'
		},
		{
			logo: `${toolSprites}#sanity`,
			title: 'Sanity.io'
		},
		{
			logo: `${toolSprites}#storyblok`,
			title: 'Storyblok'
		},
		{
			logo: `${toolSprites}#strapi`,
			title: 'Strapi'
		}
	];

	const ssg = [
		{
			logo: `${toolSprites}#11ty`,
			title: '11ty'
		},
		{
			logo: `${toolSprites}#gatsby`,
			title: 'Gatsby'
		},
		{
			logo: `${toolSprites}#gridsome`,
			title: 'Gridsome'
		},
		{
			logo: `${toolSprites}#hugo`,
			title: 'Hugo'
		},
		{
			logo: `${toolSprites}#jekyll`,
			title: 'Jekyll'
		},
		{
			logo: `${toolSprites}#nextjs`,
			title: 'NextJS'
		},
		{
			logo: `${toolSprites}#nuxtjs`,
			title: 'NuxtJS'
		},
		{
			logo: `${toolSprites}#sapper`,
			title: 'Sapper'
		},
		{
			logo: `${toolSprites}#scully`,
			title: 'Scully'
		},
		{
			logo: `${toolSprites}#sveltekit`,
			title: 'SvelteKit'
		}
	];

	const hosts = [
		{
			logo: `${toolSprites}#aws`,
			title: 'AWS'
		},
		{
			logo: `${toolSprites}#azure`,
			title: 'Azure'
		},
		{
			logo: `${toolSprites}#begin`,
			title: 'Begin.com'
		},
		{
			logo: `${toolSprites}#cloudflare`,
			title: 'Cloudflare Pages'
		},
		{
			logo: `${toolSprites}#digitalocean`,
			title: 'Digital Ocean'
		},
		{
			logo: `${toolSprites}#firebase`,
			title: 'Firebase'
		},
		{
			logo: `${toolSprites}#netlify`,
			title: 'Netlify'
		},
		{
			logo: `${toolSprites}#render`,
			title: 'Render'
		},
		{
			logo: `${toolSprites}#vercel`,
			title: 'Vercel'
		}
	];
</script>

<section>
	<div class="container hero">
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
				<svg>
					<use xlink:href="{featureSprites}#speedometer" />
				</svg>

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
				<svg>
					<use xlink:href="{featureSprites}#shield" />
				</svg>

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
				<svg>
					<use xlink:href="{featureSprites}#money" />
				</svg>

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
						<svg class="badge__icon">
							<title>{title}</title>
							<use xlink:href={logo} />
						</svg>
					</li>
				{/each}
			</ul>
		</div>

		<div class="badges">
			<h4 class="text-sm bold">STATIC SITE GENERATOR</h4>

			<ul>
				{#each ssg as { logo, title }, i (i)}
					<li>
						<svg class="badge__icon">
							<title>{title}</title>
							<use xlink:href={logo} />
						</svg>
					</li>
				{/each}
			</ul>
		</div>

		<div class="badges">
			<h4 class="text-sm bold">DEPLOYMENT PLATFORMS</h4>

			<ul>
				{#each hosts as { logo, title }, i (i)}
					<li>
						<svg class="badge__icon">
							<title>{title}</title>
							<use xlink:href={logo} />
						</svg>
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
				<svg>
					<use xlink:href="{featureSprites}#blogging" />
				</svg>

				<div>
					<h4 class="text-xl">Web Design & Development</h4>
					<p>
						Static doesn't mean boring. We design and build sites with proven technologies to offer
						dynamic, interactive designs that customers love.
					</p>
				</div>
			</article>
			<article>
				<svg>
					<use xlink:href="{featureSprites}#shopping" />
				</svg>

				<div>
					<h4 class="text-xl">eCommerce Stores</h4>
					<p>
						Losing a visitor on your online shop costs your more than just impressions, it hits your
						bottom line. We build modern, accessible eCommerce stores that grow with your business.
					</p>
				</div>
			</article>
			<article>
				<svg>
					<use xlink:href="{featureSprites}#architecture" />
				</svg>

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
