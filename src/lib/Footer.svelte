<script lang="ts">
	import Email from '$lib/icons/Email.svelte';
	import LinkedIn from '$lib/icons/LinkedIn.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<ul class="social">
			<li>
				<a href="mailto:info@kamfly.io">
					<span class="sr-only">Email us at info@kamfly.io</span>
					<Email />
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/company/kamfly">
					<span class="sr-only">Find us on LinkedIn</span>
					<LinkedIn />
				</a>
			</li>
			<li>
				<a href="https://twitter.com/kamflyio">
					<span class="sr-only">Find us on Twitter</span>
					<Twitter />
				</a>
			</li>
		</ul>

		<ul class="links">
			<li>
				<a href="/privacy">Privacy Policy</a>
			</li>
			<li>
				<a href="/terms">Terms & Conditions</a>
			</li>
			<li>
				<a href="/contact">Contact Us</a>
			</li>
		</ul>

		<div class="legal">
			<div>© {year} Navillus B.V.</div>

			<small>
				Icons made by
				<a href="https://www.freepik.com" class="underline" title="Freepik">Freepik</a>
				from
				<a href="https://www.flaticon.com/" class="underline" title="Flaticon">
					www.flaticon.com
				</a>
			</small>
		</div>
	</div>
</footer>

<style>
	footer {
		background: var(--color-secondary);
	}

	.container {
		padding-top: var(--spacer-lg);
		padding-bottom: var(--spacer-lg);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacer-md);
	}

	.social {
		display: flex;
		flex-direction: row;
		gap: var(--spacer-sm);
	}

	.social :global(svg) {
		height: var(--text-4xl);
		overflow: visible;
	}

	.links {
		display: flex;
		flex-direction: row;
	}

	.links a {
		text-decoration: underline;
		padding: 0 var(--spacer-xs);
		font-size: var(--text-sm);

		@media (min-width: 480px) {
			& {
				padding: 0 var(--spacer-sm);
				font-size: var(--text-base);
			}
		}
	}

	.links li:not(:last-of-type) {
		border-right: 1px solid currentColor;
	}

	.legal {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
