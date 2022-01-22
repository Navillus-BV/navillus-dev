declare namespace CMS {
  type ContactIcon = "devto" | "email" | "github" | "rss" | "twitter";
  type FeatureIcon =
    | "architecture"
    | "blogging"
    | "money"
    | "shield"
    | "shopping"
    | "speedometer";
  type ToolIcon =
    | "11ty"
    | "astro"
    | "aws"
    | "azure"
    | "begin"
    | "cloudflare"
    | "contentful"
    | "datocms"
    | "digitalocean"
    | "firebase"
    | "forestry"
    | "gatsby"
    | "gridsome"
    | "hugo"
    | "jekyll"
    | "netlify"
    | "netlify-cms"
    | "nextjs"
    | "nuxtjs"
    | "prismic"
    | "render"
    | "sanity"
    | "sapper"
    | "scully"
    | "storyblok"
    | "strapi"
    | "sveltekit"
    | "vercel";
  type Icon = ContactIcon | FeatureIcon | ToolIcon;

  type Markdown = string;

  interface SiteSettings {
    title: string;
    url: string;
    author: string;
    twitter_handle: string;
    twitter_card: "app" | "player" | "summary" | "summary_large_image";
  }

  interface NavigationLink {
    title: string;
    page: string;
    id?: string;
  }

  interface Navigation {
    pages: [NavigationLink];
    legal: [NavigationLink];
    contact: [
      {
        title: string;
        url: string;
        icon: ContactIcon;
      }
    ];
  }

  interface Author {
    first_name: string;
    last_name: string;
    url: string;
  }

  interface BasePage {
    permalink: string;
    title: string;
    description: string;
    image: string;
    published: boolean;
    date: string;
    blocks: Block[];
    last_modified_at?: string;
  }

  interface BlogPostPage extends BasePage {
    template: "post";
    author: string;
    tweet_id?: string;
    tags: string[];
  }

  interface Hero {
    title: string;
    subtitle: string;
    content: string;
    cta?: {
      text: string;
      href: string;
    };
  }

  interface HeroPage extends BasePage {
    template: "hero";
    hero: Hero;
  }

  interface LegalPage extends BasePage {
    template: "legal";
  }

  interface BaseBlock {
    title?: string;
    subtitle?: string;
    id?: string;
    alt: boolean;
  }

  interface BadgesBlockItem {
    description: string;
    icon: ToolIcon;
  }

  interface BadgesBlockGroup {
    title: string;
    items: [BadgesBlockItem];
  }

  interface BadgesBlock extends BaseBlock {
    template: "badges-block";
    groups: [BadgesBlockGroup];
  }

  interface ContactBlock extends BaseBlock {
    template: "contact-block";
    content: Markdown;
  }

  interface FeaturesBlockItem {
    title: string;
    icon: FeatureIcon;
    content: Markdown;
  }

  interface FeaturesBlock extends BaseBlock {
    template: "features-block";
    items: [FeaturesBlockItem];
  }

  type Block = BadgesBlock | ContactBlock | FeaturesBlock;
  type Page = BlogPostPage | HeroPage | LegalPage;
}
