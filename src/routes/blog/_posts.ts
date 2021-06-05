import { authors } from './_authors';

const found = import.meta.globEager('../../data/pages/blog/*.md') as Record<
	string,
	MarkdownData<BlogPostRaw>
>;

const FILENAME_REGEX = /^(?:.*\/)?(\d+-\d+-\d+)-(.+)\.md$/;

type BlogPostRaw = {
	title: string;
	description: string;
	author: string;
	image?: string;
	modified_date?: string;
};

function toDateString(str: string) {
	return new Date(str).toDateString();
}

function sortPosts(a: MarkdownData<BlogPostData>, b: MarkdownData<BlogPostData>) {
	const aDate = new Date(a.attributes.published_date);
	const bDate = new Date(b.attributes.published_date);

	return aDate > bDate ? -1 : 1;
}

export const posts = Object.keys(found).reduce((acc, next) => {
	const match = FILENAME_REGEX.exec(next);

	if (match) {
		const [, published_date, slug] = match;

		const { attributes, ...rest } = found[next];

		acc[slug] = {
			...rest,
			attributes: {
				...attributes,
				author: authors[attributes.author],
				published_date: toDateString(published_date),
				modified_date: attributes.modified_date && toDateString(attributes.modified_date),
				slug
			}
		};
	}

	return acc;
}, {} as Record<string, MarkdownData<BlogPostData>>);

export const sortedPosts = Object.values(posts).sort(sortPosts);
