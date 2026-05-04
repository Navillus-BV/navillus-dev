import data from "./navigation.json"

export type ContactIcon = "devto" | "email" | "github" | "rss" | "twitter"

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