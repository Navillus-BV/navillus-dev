<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { enhance } from '$lib/actions/enhance';
	import Brand from '$lib/logos/Brand.svelte';

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
	let menuOpen = true;
	let enableMenuLeave = false;

	$: if (innerWidth > 640) menuOpen = false;

	let startOfContentElem: HTMLElement;

	const onSkipToContent = () => {
		if (!startOfContentElem) {
			return;
		}

		const nextElem = startOfContentElem.nextElementSibling;

		if (nextElem instanceof HTMLElement) {
			nextElem.setAttribute('tabindex', '-1');
			nextElem.focus();
		}
	};

	onMount(() => {
		menuOpen = false;
	});

</script>

<svelte:window bind:innerWidth />

<header>
	<a
		href="#start-of-content"
		class="sr-only sr-only-focusable"
		on:click|preventDefault={onSkipToContent}>Skip to content</a
	>
	<div class="container top">
		<a href="/" class="brand">
			<span class="sr-only">Go to homepage</span>
			<Brand />
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

		<a href="/#contact" class="button button--outline">Get in Touch</a>

		<label
			for="toggle"
			aria-label="Open Menu"
			class="hamburger hamburger--squeeze header__hamburger flex lg:hidden"
			class:is-active={menuOpen}
			use:enhance
			on:click={() => (menuOpen = !menuOpen)}
		>
			<span class="hamburger-box">
				<span class="hamburger-inner" />
			</span>
		</label>
	</div>

	<input type="checkbox" id="toggle" class="sr-only" use:enhance />

	{#if menuOpen}
		<nav
			class="container"
			in:slide={{ duration: 300, easing: cubicOut }}
			out:slide={{ duration: enableMenuLeave ? 300 : 0, easing: cubicOut }}
			on:introend={() => (enableMenuLeave = true)}
		>
			<ul>
				{#each routes as { title, href } (title)}
					<li>
						<a {href} class="h5" aria-current={$page.path === '/'}>{title}</a>
					</li>
				{/each}
				<li>
					<a href="/#contact" aria-current={$page.path === '/#contact'} class="button">
						Get in Touch
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>

<div id="start-of-content" class="sr-only" bind:this={startOfContentElem} />

<style style lang="postcss">
	* + * {
		margin-top: 0;
	}

	header {
		position: relative;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	a[href='#start-of-content'] {
		top: 50%;
		background: var(--chisel-neutral-900);
		color: var(--chisel-neutral-50);
		padding: var(--spacer-sm);
		transform: translateY(-50%);
	}

	#toggle:not(.js) {
		& + nav {
			display: none;
		}

		&:checked + nav {
			display: block;
		}
	}

	.top {
		padding-top: var(--spacer-sm);
		padding-bottom: var(--spacer-sm);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.top nav,
	.top a.button {
		display: none;
	}

	.brand {
		height: 2rem;

		& :global(svg) {
			margin-top: 0;
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

	nav a:not(.button) {
		line-height: 2;
		padding: 0 var(--spacer-sm);
	}

	nav a.button {
		margin-bottom: var(--spacer-md);
	}

	@media (min-width: 768px) {
		.top nav,
		.top a.button {
			display: inline-flex;
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
