import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../../data/site";
import { marked } from "marked";

function sortPosts(a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) {
    return b.data.date.getTime() - a.data.date.getTime();
}

export const GET: APIRoute = async (context) => {
    const allPosts = await getCollection("blog")
        .then((posts) => posts.filter((p) => p.data.published).sort(sortPosts))

    return rss({
        title: 'Blog | Navillus',
        description: site.description,
        customData: `<language>en-us</language>`,
        site: context.site!,
        items: allPosts.map((item: CollectionEntry<"blog">) => {
            const seo = {
                title: item.data.title,
                description: item.data.description,
                image: item.data.social_image,
            }

            const url = new URL(`/blog/${item.slug}`, site.url)

            const content = `<content><![CDATA[ ${marked(item.body)} ]]></content>`

            const customData = [
                `<id>${url.pathname}</id>`,
                item.data.last_modified_at && `<updated>${item.data.last_modified_at}</updated>`,
                content,
            ]
                .filter(Boolean) // remove <updated> if it wasn't used
                .join('') // combine into one string

            return {
                title: seo.title,
                description: seo.description,
                link: url.toString(),
                pubDate: item.data.date,
                customData
            }
        }),
    })
}