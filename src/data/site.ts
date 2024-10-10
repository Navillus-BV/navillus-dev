import data from './site.json'

export type SiteSettings = {
    title: string
    description: string
    url: string
    author: string
    twitter_handle: string
    twitter_card: string
}

export const site = data as SiteSettings
