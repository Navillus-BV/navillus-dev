import { basename } from 'path'

const found = import.meta.globEager('../../data/pages/blog/*.md')

export const posts = Object.keys(found)
    .reduce((acc, next) => {
        const slug = basename(next, '.md')
        acc[slug] = {
            ...found[next],
            slug
        }

        return acc
    }, {})