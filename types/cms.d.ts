declare namespace CMS {
  interface Site {
    title: string
    description: string
    url: string
    domain: string
    author: string
    social: {
      twitter: string
      twitter_card: string
      image: string
    }
    company: {
      name: string
    }
  }

  interface NavigationItem {
    title: string
    href: string
    icon?: string
  }

  interface Navigation {
    main: [NavigationItem]
    legal: [NavigationItem]
    social: [NavigationItem]
  }

  interface SEO {
    title?: string
    description?: string
    image?: string
  }

  type AuthorId = string

  interface Author {
    first_name: string
    last_name: string
    url: string
    slug: AuthorId
  }

  interface BasePage {
    template: 'legal' | 'page' | 'post'
    permalink: string
    published: boolean
    content: {
      html: string
      md: string
    }
    seo?: SEO
  }

  interface PostPage extends BasePage {
    date: string
    author: AuthorId
    tweetId?: string
    last_modified_at?: string
    category?: string
    categories?: string[]
    tags?: string[]
  }

  interface ContentPage extends BasePage {
    template: 'page'
    hero?: Hero
    blocks: Block[]
  }

  interface LegalPage extends BasePage {
    template: 'legal'
    last_modified_at?: string
    title: string
  }

  type Page = ContentPage | LegalPage | PostPage

  interface Link {
    href: string
    text: string
  }

  interface Hero {
    title: string
    subtitle: string
    content: string
    cta: Link
  }

  interface UIBlock {
    title?: string
    subtitle?: string
    alt?: boolean
    id?: string
  }

  interface BadgesBlockItem {
    title: string
    icon: string
  }

  interface BadgesBlockGroup {
    title: string
    items: [BadgesBlockItem]
  }

  interface BadgesBlock extends UIBlock {
    template: 'badgesblock'
    groups: [BadgesBlockGroup]
  }

  interface ContactBlock extends UIBlock {
    template: 'contactblock'
    content: string
  }

  interface FeaturesBlockItem {
    icon: string
    title: string
    content: string
  }

  interface FeaturesBlock extends UIBlock {
    template: 'featuresblock'
    items: [FeaturesBlockItem]
  }

  type Block = BadgesBlock | ContactBlock | FeaturesBlock
}
