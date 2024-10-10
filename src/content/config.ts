import { defineCollection, reference, z, type ImageFunction } from "astro:content";
import { site } from "../data/site";

const baseBlockSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    id: z.string().optional(),
    alt: z.boolean().default(false)
})
export type BaseBlock = z.infer<typeof baseBlockSchema>

const contactIconSchema = z.enum([
    "devto", "email", "github", "rss", "twitter"
])
export type ContactIcon = z.infer<typeof contactIconSchema>

const toolIconSchema = z.enum([
    "11ty",
    "astro",
    "aws",
    "azure",
    "begin",
    "cloudflare",
    "contentful",
    "datocms",
    "digitalocean",
    "firebase",
    "forestry",
    "gatsby",
    "gridsome",
    "hugo",
    "jekyll",
    "netlify",
    "netlify-cms",
    "nextjs",
    "nuxtjs",
    "prismic",
    "render",
    "sanity",
    "sapper",
    "scully",
    "storyblok",
    "strapi",
    "sveltekit",
    "vercel"
])
export type ToolIcon = z.infer<typeof toolIconSchema>
const badgesBlockSchema = baseBlockSchema.extend({
    type: z.literal('badges'),
    groups: z.array(z.object({
        title: z.string(),
        items: z.array(z.object({
            alt: z.string(),
            icon: toolIconSchema,
        }))
    }))
})
export type BadgeBlock = z.infer<typeof badgesBlockSchema>

const contactBlockSchema = baseBlockSchema.extend({
    type: z.literal('contact'),
    content: z.string(),
})
export type ContactBlock = z.infer<typeof contactBlockSchema>

const featureIconSchema = z.enum([
    "architecture",
    "blogging",
    "money",
    "shield",
    "shopping",
    "speedometer"
])
export type FeatureIcon = z.infer<typeof featureIconSchema>
const featuresBlockSchema = baseBlockSchema.extend({
    type: z.literal('features'),
    items: z.array(z.object({
        title: z.string(),
        icon: featureIconSchema,
        content: z.string()
    }))
})
export type FeaturesBlock = z.infer<typeof featuresBlockSchema>

const blockSchema = badgesBlockSchema
    .or(contactBlockSchema)
    .or(featuresBlockSchema)
export type Block =
    BadgeBlock
    | ContactBlock
    | FeaturesBlock

export type Icon = ToolIcon | ContactIcon | FeatureIcon

const basePageSchema = (image: ImageFunction) => z.object({
    type: z.literal('page'),
    title: z.string().optional().default(""),
    description: z.string().optional().default(site.description),
    social_image: z.object({
        src: image(),
        alt: z.string(),
    }),
    published: z.boolean().optional().default(true),
    date: z.date({ coerce: true }),
    blocks: z.array(blockSchema).optional().default([]),
    last_modified_at: z.date({ coerce: true }).optional()
})
export type BasePage = z.infer<ReturnType<typeof basePageSchema>>

const blogPostSchema = (image: ImageFunction) =>
    basePageSchema(image).extend({
        type: z.literal('blog').optional().default('blog'),
        author: reference("authors"),
        tweet_id: z.string().optional(),
        tags: z.array(z.string()).default([])
    })
export type BlogPost = z.infer<ReturnType<typeof blogPostSchema>>

const heroSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    content: z.string(),
    cta: z.object({
        text: z.string(),
        href: z.string()
    }).optional()
})
export type Hero = z.infer<typeof heroSchema>
const heroPageSchema = (image: ImageFunction) =>
    basePageSchema(image).extend({
        type: z.literal('hero'),
        hero: heroSchema
    })
export type HeroPage = z.infer<ReturnType<typeof heroPageSchema>>

const legalPageSchema = (image: ImageFunction) =>
    basePageSchema(image).extend({
        type: z.literal('legal')
    })
export type LegalPage = z.infer<ReturnType<typeof legalPageSchema>>

const pageSchema = (image: ImageFunction) =>
    basePageSchema(image)
        .or(heroPageSchema(image))
        .or(legalPageSchema(image))
export type Page =
    BasePage
    | HeroPage
    | LegalPage

const authorSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    url: z.string().url()
})
export type Author = z.infer<typeof authorSchema>

export const collections = {
    pages: defineCollection({
        type: "content",
        schema: ({ image }) => pageSchema(image)
    }),
    blog: defineCollection({
        type: "content",
        schema: ({ image }) => blogPostSchema(image)
    }),
    authors: defineCollection({
        type: "data",
        schema: authorSchema
    })
}