const preprocess = require('svelte-preprocess');
const adapter = require('@sveltejs/adapter-static');
const markdownIt = require('markdown-it');
const prism = require('markdown-it-prism');
const { plugin: mdPlugin, Mode } = require('vite-plugin-markdown');
const { resolve } = require('path');

const md = markdownIt({ html: true }).use(prism);

const defaultRender =
	md.renderer.rules.link_open ||
	function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	const hrefIdx = tokens[idx].attrIndex('href');
	const href = tokens[idx].attrs[hrefIdx][1];

	if (href.startsWith('http')) {
		// If you are sure other plugins can't add `target` - drop check below
		var targetIdx = tokens[idx].attrIndex('target');

		if (targetIdx < 0) {
			tokens[idx].attrPush(['target', '_blank']); // add new attribute
		} else {
			tokens[idx].attrs[targetIdx][1] = '_blank'; // replace value of existing attr
		}

		var relIdx = tokens[idx].attrIndex('rel');

		if (relIdx < 0) {
			tokens[idx].attrPush(['rel', 'noopener']);
		} else {
			tokens[id].attrs[relIdx][1] = 'noopener';
		}
	}

	// pass token to default renderer.
	return defaultRender(tokens, idx, options, env, self);
};

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
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
					mode: [Mode.HTML, Mode.TOC],
					markdownIt: md
				})
			]
		}
	}
};
