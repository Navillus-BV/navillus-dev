<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import Brand from '$lib/logos/Brand.svelte';

	let innerWidth: number;
	let menuOpen = false;
	let mounted = false;
	let enableMenuLeave = false;

	$: if (innerWidth > 640) menuOpen = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:innerWidth />

<header>
	<div class="container top">
		<a href="/" class="brand">
			<span class="sr-only">Go to homepage</span>
			<Brand class="fill-current" />
		</a>

		<nav>
			<ul>
				<li>
					<a href="/" aria-current={$page.path === '/'}>Home</a>
				</li>
				<li>
					<a href="/services" aria-current={$page.path === '/services'}>Services</a>
				</li>
				<li>
					<a href="/portfolio" aria-current={$page.path === '/portfolio'}>Portfolio</a>
				</li>
				<li>
					<a href="/blog" aria-current={$page.path === '/blog'}>Blog</a>
				</li>
			</ul>
		</nav>

		<a href="/contact" class="btn btn--hollow">Get in Touch</a>

		<label
			for="toggle"
			aria-label="Open Menu"
			class="hamburger hamburger--squeeze header__hamburger flex lg:hidden"
			class:is-active={menuOpen}
			on:click={() => (menuOpen = !menuOpen)}
		>
			<span class="hamburger-box">
				<span class="hamburger-inner" />
			</span>
		</label>
	</div>

	<input type="checkbox" id="toggle" class="sr-only" class:no-js={!mounted} />

	{#if !mounted || menuOpen}
		<nav
			class="container"
			in:slide={{ duration: 300, easing: cubicOut }}
			out:slide={{ duration: enableMenuLeave ? 300 : 0, easing: cubicOut }}
			on:introend={() => (enableMenuLeave = true)}
		>
			<ul>
				<li>
					<a href="/" class="text-lg" aria-current={$page.path === '/'}>Home</a>
				</li>
				<li>
					<a href="/services" class="text-lg" aria-current={$page.path === '/services'}>Services</a>
				</li>
				<li>
					<a href="/portfolio" class="text-lg" aria-current={$page.path === '/portfolio'}
						>Portfolio</a
					>
				</li>
				<li>
					<a href="/blog" class="text-lg" aria-current={$page.path === '/blog'}>Blog</a>
				</li>
				<li class="w-full">
					<a href="/contact" aria-current={$page.path === '/contact'} class="btn w-full"
						>Get in Touch</a
					>
				</li>
			</ul>
		</nav>
	{/if}
</header>

<style style lang="postcss">
	#toggle.no-js + nav {
		display: none;
	}

	#toggle.no-js:checked + nav {
		display: block;
	}

	.top {
		padding-top: var(--spacer-sm);
		padding-bottom: var(--spacer-sm);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.top nav,
	.top a.btn {
		display: none;
	}

	.brand {
		height: 1.5rem;

		@media (min-width: 640px) {
			& {
				height: 2rem;
			}
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ul li:last-of-type {
		margin-top: var(--spacer-sm);
	}

	nav a {
		line-height: 2;
		padding: 0 var(--spacer-sm);
	}

	[aria-current='true'] {
		text-decoration: underline;
	}

	@media (min-width: 768px) {
		.top nav,
		.top a.btn {
			display: inline-block;
		}

		label[for='toggle'] {
			display: none;
		}

		ul {
			flex-direction: row;
			gap: var(--spacer-xs);
		}

		ul li:last-of-type {
			margin-top: 0;
		}
	}
</style>
