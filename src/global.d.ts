/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.md' {
    const { attributes, toc, html }: PageData<unknown>;
    export { attributes, toc, html };
}

declare type PageData<T> = {
    attributes: T;
    toc: { level: string, content: string }[];
    html: string;
}

declare type BlogPostData = {
    title: string;
    description: string;
    published_date: Date | string;
    slug: string;
    author: string;
    author_url: string;
}