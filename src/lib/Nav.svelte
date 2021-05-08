<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import Brand from '$lib/logos/Brand.svelte';
	import { enhance } from '$lib/actions/enhance';

	const routes = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Services',
			href: '/#services'
		},
		{
			title: 'Blog',
			href: '/blog'
		},
		{
			title: 'Contact',
			href: '/#contact'
		}
	];

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
				{#each routes as { title, href } (title)}
					<li>
						<a {href} aria-current={$page.path === href}>{title}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<a href="/#contact" class="btn btn--hollow">Get in Touch</a>

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

	<input type="checkbox" id="toggle" class="sr-only" use:enhance />

	{#if !mounted || menuOpen}
		<nav
			class="container"
			in:slide={{ duration: 300, easing: cubicOut }}
			out:slide={{ duration: enableMenuLeave ? 300 : 0, easing: cubicOut }}
			on:introend={() => (enableMenuLeave = true)}
		>
			<ul>
				{#each routes as { title, href } (title)}
					<li>
						<a {href} class="text-lg" aria-current={$page.path === '/'}>{title}</a>
					</li>
				{/each}
				<li>
					<a href="/#contact" aria-current={$page.path === '/#contact'} class="btn">Get in Touch</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>

<style style lang="postcss">
	#toggle:not(.js) + nav {
		display: none;
	}

	#toggle:not(.js):checked + nav {
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
		height: 2rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ul li:last-of-type {
		margin-top: var(--spacer-sm);
	}

	nav a:not(.btn) {
		line-height: 2;
		padding: 0 var(--spacer-sm);
	}

	nav a.btn {
		margin-bottom: var(--spacer-md);
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
		}

		ul li:last-of-type {
			margin-top: 0;
		}
	}

	@media (min-width: 1024px) {
		ul {
			gap: var(--spacer-xs);
		}
	}
</style>
