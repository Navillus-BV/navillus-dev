import { posts } from './_posts'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
    const { slug } = params
    const post = posts[slug]

    if (post) {
        return {
            body: post
        }
    }
}
