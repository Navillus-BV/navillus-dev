/// <reference types="@sveltejs/kit" />

declare module '*.md' {
	const { attributes, toc, html }: MarkdownData<unknown>;
	export { attributes, toc, html };
}

declare type MarkdownData<T> = {
	attributes: T;
	toc: { level: string; content: string }[];
	html: string;
};

declare type BlogPostData = {
	title: string;
	description: string;
	published_date: string;
	modified_date?: string;
	slug: string;
	author: Author;
	tags: string[];
	minutes: number;
	image?: string;
	draft?: boolean;
};

declare type Author = {
	first_name: string;
	last_name: string;
	url: string;
	slug: string;
};

declare type Link = {
	title: string;
	href: string;
};
