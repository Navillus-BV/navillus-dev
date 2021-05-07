type AuthorRaw = {
	first_name: string;
	last_name: string;
};

const found = import.meta.globEager('../../data/authors/*.md') as Record<
	string,
	MarkdownData<AuthorRaw>
>;

const FILENAME_MATCH = /^(?:.*\/)?([^/]+?|).md$/;

export const authors = Object.keys(found).reduce((acc, next) => {
	const match = next.match(FILENAME_MATCH);

	if (match) {
		const [, slug] = match;
		acc[slug] = {
			...found[next].attributes,
			slug
		};
	}

	return acc;
}, {} as Record<string, Author>);
