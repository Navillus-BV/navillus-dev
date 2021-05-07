import { posts } from './_posts';
import type { RequestHandler } from '@sveltejs/kit';

const body = {
	posts: Object.values(posts)
		.map(({ attributes }) => attributes)
		.sort((a, b) => {
			const aDate = new Date(a.published_date);
			const bDate = new Date(b.published_date);

			return aDate > bDate ? -1 : 1;
		})
};

export const get: RequestHandler = () => ({ body });
