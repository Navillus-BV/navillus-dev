import site from '$data/site.json';
import { sortedPosts } from '../routes/blog/_posts';
import type { BlogPosting, Organization, Thing, WebSite, WithContext } from 'schema-dts';

export type Schema = Thing | WithContext<Thing>;

export function serializeSchema(thing: Schema) {
	return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`;
}

export const websiteSchema: WithContext<WebSite> = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: site.title,
	url: site.url,
	description: site.description,
	sameAs: [`https://twitter.com/${site.social.twitter}`]
};

export const organizationSchema: WithContext<Organization> = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${site.url}#organization`,
	url: site.url,
	name: site.company.name,
	description: site.description,
	sameAs: [`https://twitter.com/${site.social.twitter}`],
	logo: `${site.url}/favicon.svg`
};

export function blogPostSchema(post: MarkdownData<BlogPostData>): WithContext<BlogPosting> {
	const { ['@context']: context, ...publisher } = organizationSchema as any;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		url: `${site.url}/blog/${post.attributes.slug}`,
		datePublished: new Date(post.attributes.published_date).toDateString(),
		headline: post.attributes.title,
		publisher: {
			...publisher
		},
		dateModified:
			post.attributes.modified_date && new Date(post.attributes.modified_date).toDateString()
	};
}
