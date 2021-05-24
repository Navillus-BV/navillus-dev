<script lang="ts">
	import contactSprites from '../assets/contact-sprites.svg';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<ul class="social">
			<li>
				<a href="mailto:info@navillus.nl">
					<span class="sr-only">Email us at info@navillus.nl</span>
					<svg>
						<use xlink:href="{contactSprites}#email" />
					</svg>
				</a>
			</li>
			<!--<li>
				<a href="https://www.linkedin.com/company/kamflyio">
					<span class="sr-only">Find us on LinkedIn</span>
					<svg>
						<use xlink:href="{contactSprites}#linkedin" />
					</svg>
				</a>
			</li>-->
			<li>
				<a href="https://twitter.com/navillus_dev">
					<span class="sr-only">Find us on Twitter</span>
					<svg>
						<use xlink:href="{contactSprites}#twitter" />
					</svg>
				</a>
			</li>
		</ul>

		<ul class="links">
			<li>
				<a class="h6" href="/privacy">Privacy Policy</a>
			</li>
			<li>
				<a class="h6" href="/terms">Terms & Conditions</a>
			</li>
			<li>
				<a class="h6" href="/#contact">Contact Us</a>
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
		background: var(--chisel-neutral-50);
	}

	a {
		color: var(--chisel-neutral-900);
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

	.social svg {
		height: var(--chisel-h1);
		width: var(--chisel-h1);
		overflow: visible;
	}

	.links {
		display: flex;
		flex-direction: row;
	}

	.links a {
		text-decoration: underline;
		padding: 0 var(--spacer-xs);

		@media (min-width: 480px) {
			& {
				padding: 0 var(--spacer-sm);
				font-size: var(--chisel-p);
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
