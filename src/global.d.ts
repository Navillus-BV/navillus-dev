/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.md' {
    const { attributes, toc, html }: MarkdownData<unknown>
    export { attributes, toc, html }
}

declare type MarkdownData<T> = {
    attributes: T
    toc: { level: string, content: string }[]
    html: string
}

declare type BlogPostData = {
    title: string
    description: string
    published_date: string
    slug: string
    author: Author
}

declare type Author = {
    first_name: string
    last_name: string
    slug: string
}