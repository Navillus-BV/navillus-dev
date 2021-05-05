import { basename } from 'path'

const found = import.meta.globEager('../../data/pages/blog/*.md') as Record<string, PageData<BlogPostRaw>>

const FILENAME_REGEX = /^(\d+-\d+-\d+)-(.+)\.md$/

type BlogPostRaw = {
    title: string
    description: string
    author: string
    author_url: string
}

export const posts = Object.keys(found)
    .reduce((acc, next) => {
        const match = FILENAME_REGEX.exec(basename(next))

        if (match) {
            const [, published_date, slug] = match

            acc[slug] = {
                ...found[next],
                attributes: {
                    ...found[next].attributes,
                    published_date,
                    slug
                }
            }
        }

        return acc
    }, {} as Record<string, PageData<BlogPostData>>)