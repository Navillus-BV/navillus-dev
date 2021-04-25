<script lang="ts">
	let formElem: HTMLFormElement;

	async function onSubmit() {
		try {
			const formData = new FormData(formElem);
			const params = new URLSearchParams(formData as any);

			await fetch('/#contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: params.toString()
			});
		} catch (err) {
			console.log(err);
		}
	}
</script>

<form
	bind:this={formElem}
	name="contact"
	on:submit|preventDefault={onSubmit}
	netlify-honeypot="bot-field"
	data-netlify="true"
>
	<input type="hidden" name="form-name" value="contact" />
	<p class="honeypot">
		<label>
			Don’t fill this out if you're human:
			<input name="bot-field" />
		</label>
	</p>
	<div class="form__row">
		<div>
			<label for="name">Your Name *</label>
			<input id="name" name="name" type="text" required />
		</div>
		<div>
			<label for="email">Your Email Address *</label>
			<input id="email" name="email" type="email" required />
		</div>
	</div>
	<div>
		<div>
			<label for="message">Your Message *</label>
			<textarea id="message" name="message" rows="6" required />
		</div>
	</div>

	<button type="submit" class="btn btn">submit</button>
</form>

<style>
	form {
		width: 100%;
	}

	form label {
		font-size: var(--text-sm);
		margin-bottom: var(--spacing-1);
		display: block;
		text-align: start;
	}

	form .honeypot {
		display: none;
	}

	input[type='text'],
	input[type='email'],
	textarea {
		font-size: var(--text-base);
		padding: var(--spacer-xs);
		background: var(--color-secondary);
		border-radius: 0.5em;
		margin-bottom: var(--spacer-sm);
		width: 100%;
		border: none;
	}

	.form__row {
		display: grid;
		grid-template-columns: 1fr;

		@media (min-width: 768px) {
			& {
				grid-template-columns: repeat(2, 1fr);
				column-gap: var(--spacer-md);
			}
		}
	}
</style>
