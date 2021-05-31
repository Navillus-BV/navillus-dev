import { sortedPosts } from './_posts';
import type { RequestHandler } from '@sveltejs/kit';

const posts = sortedPosts.map(({ attributes }) => attributes);

export const get: RequestHandler = () => ({ body: { posts } });
