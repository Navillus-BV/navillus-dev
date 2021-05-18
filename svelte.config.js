import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import markdownIt from 'markdown-it';
import prism from 'markdown-it-prism';
import 'prism-svelte';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-typescript.js';
import viteMd from 'vite-plugin-markdown';
import { resolve } from 'path';

console.log(Object.keys(Prism.languages))

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
			tokens[idx].attrs[relIdx][1] = 'noopener';
		}
	}

	// pass token to default renderer.
	return defaultRender(tokens, idx, options, env, self);
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			preserve: ['ld+json']
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
					$data: resolve('src/data'),
					$utils: resolve('src/utils')
				}
			},
			plugins: [
				viteMd.plugin({
					mode: [viteMd.Mode.HTML, viteMd.Mode.TOC],
					markdownIt: md
				})
			]
		}
	}
};

export default config;
