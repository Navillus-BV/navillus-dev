const preprocess = require('svelte-preprocess');
const adapter = require('@sveltejs/adapter-static');
const { plugin: mdPlugin, Mode } = require('vite-plugin-markdown');
const { resolve } = require('path');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
	],

	kit: {
		adapter: adapter(),

		router: false,

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			resolve: {
				alias: {
					$data: resolve('src/data')
				}
			},
			plugins: [
				mdPlugin({
					mode: [Mode.HTML, Mode.TOC]
				})
			]
		}
	}
};
