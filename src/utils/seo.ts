import site from '../data/site.json'
import { formatDate } from './dates'

export interface SEO {
  title: string
  description: string
  image: string
  canonical: string
}

export function permalinkToCanonical(permalink: string): string {
  return new URL(permalink, site.url).href
}

export function getSeo(page: CMS.Page): SEO {
  return {
    title: page.title || site.title,
    description: page.description || site.description,
    image: page.image || site.image,
    canonical: permalinkToCanonical(page.permalink),
  }
}

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}#organization`,
  url: site.url,
  name: site.title,
  description: site.description,
  sameAs: [`https://twitter.com/${site.twitter_handle}`],
  logo: `${site.url}favicon.svg`,
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${site.title} • Navillus`,
  url: site.url,
  description: site.description,
  sameAs: [`https://twitter.com/${site.twitter_handle}`],
}

function serializeSchema(thing: Object) {
  return `<script type="application/ld+json">${JSON.stringify(
    thing,
    null,
    2
  )}</script>`
}

export const websiteSchema = serializeSchema(WEBSITE)

export const organizationSchema = serializeSchema(ORGANIZATION)

export function blogPostSchema(post: CMS.BlogPostPage) {
  const { ['@context']: context, ...publisher } = ORGANIZATION

  return serializeSchema({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    url: permalinkToCanonical(post.permalink),
    datePublished: formatDate(post.date),
    headline: post.title,
    publisher: {
      ...publisher,
    },
    dateModified: post.last_modified_at && formatDate(post.last_modified_at),
    image: permalinkToCanonical(post.image),
    author: {
      '@type': 'Person',
      name: 'Tony Sullivan',
    },
  })
}
