<script lang="ts">
	let className = '';
	export let foreground = 'var(--color-text)';
	export let background = 'transparent';

	export { className as class };
</script>

<svg
	class={className}
	viewBox="0 0 512 512"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style="--fg: {foreground}; --bg: {background};"
>
	<path d="M128 6H0M128 506H0M6 0V512" stroke="var(--fg)" stroke-width="12" />
	<path d="M384 506H512M384 6H512M506 512L506 0" stroke="var(--fg)" stroke-width="12" />
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		fill="var(--fg)"
		d="M256.068 128C299.501 155.531 338.739 168.556 372.414 165.477C378.295 284.431 334.366 354.681 256.518 384C181.341 356.558 136.874 289.331 140.172 163.673C179.703 165.742 218.487 157.196 256.068 128ZM257.006 168.715C286.624 187.488 313.383 196.369 336.345 194.273C340.356 275.39 310.399 323.294 257.314 343.285C256.978 343.163 256.649 343.035 256.316 342.91V169.242L257.006 168.715ZM256.114 142.698C294.56 167.067 329.293 178.598 359.101 175.871C364.306 281.165 325.422 343.35 256.516 369.3C189.97 345.01 150.606 285.506 153.526 174.273C188.52 176.106 222.849 168.542 256.114 142.698Z"
	/>
</svg>
