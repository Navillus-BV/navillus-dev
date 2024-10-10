import { z } from "astro:content"
import data from "./navigation.json"

const contactIconSchema = z.enum([
    "devto", "email", "github", "rss", "twitter"
])
export type ContactIcon = z.infer<typeof contactIconSchema>

export type NavigationSettings = {
    pages: Array<{
        title: string,
        href: string,
        id?: string
    }>,
    legal: Array<{
        title: string,
        href: string,
        id?: string
    }>,
    contact: Array<{
        title: string,
        url: string,
        icon: ContactIcon
    }>
}

export const navigation = data as NavigationSettings