import { posts } from './_posts'
import type { RequestHandler } from '@sveltejs/kit'

const body = {
    posts: Object.values(posts)
        .map(({ attributes, slug }) => ({ ...attributes, slug }))
}

export const get: RequestHandler = () => ({ body })
