import type { RequestHandler } from '@sveltejs/kit';
import { sortedPosts } from './_posts';

const months = ',Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');

function formatPubdate(str) {
	const date = new Date(`${str} GMT+0000`);
	return date.toUTCString();
}

function escapeHTML(html) {
	const chars = {
		'"': 'quot',
		"'": '#39',
		'&': 'amp',
		'<': 'lt',
		'>': 'gt'
	};

	return html.replace(/["'&<>]/g, (c) => `&${chars[c]};`);
}

const allPosts = sortedPosts
	.filter((post) => !post.attributes.draft);

const rss = `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
	<title>Navillus blog</title>
	<link>https://navillus.dev/blog</link>
	<description>Exploring the Jamstack and the future of web development.</description>
	<image>
		<url>https://navillus.dev/google-touch-icon.png</url>
		<title>Navillus</title>
		<link>https://navillus.dev/blog</link>
	</image>
	${allPosts
		.map(
			(post) => `
		<item>
			<title>${escapeHTML(post.attributes.title)}</title>
			<link>https://navillus.dev/blog/${post.attributes.slug}</link>
			<description>${escapeHTML(post.attributes.description)}</description>
			<pubDate>${formatPubdate(post.attributes.published_date)}</pubDate>
		</item>
	`
		)
		.join('')}
</channel>
</rss>
`
	.replace(/>[^\S]+/gm, '>')
	.replace(/[^\S]+</gm, '<')
	.trim();

export const get: RequestHandler = () => {
	return {
		body: rss,
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	};
};
