declare namespace CMS {
  interface Site {
    title: string;
    description: string;
    url: string;
    domain: string;
    author: string;
    social: {
      twitter: string;
      twitter_card: string;
      image: string;
    };
    company: {
      name: string;
    };
  }

  interface NavigationItem {
    title: string;
    href: string;
    icon?: string;
  }

  interface Navigation {
    main: [NavigationItem];
    legal: [NavigationItem];
    social: [NavigationItem];
  }

  interface SEO {
    title?: string;
    description?: string;
    image?: string;
  }

  interface Page {
    template: "legal" | "page" | "post";
    permalink: string;
    published: boolean;
    seo?: SEO;
  }

  interface Post extends Page {
    date?: string;
    category?: string;
    categories?: string[];
    tags?: string[];
  }

  interface ContentPage extends Page {
    template: "page";
    hero?: Hero;
    blocks: Block[];
  }

  interface Link {
    href: string;
    text: string;
  }

  interface Hero {
    title: string;
    subtitle: string;
    content: string;
    cta: Link;
  }

  interface UIBlock {
    title?: string;
    subtitle?: string;
    alt?: boolean;
    id?: string;
  }

  interface BadgesBlockItem {
    title: string;
    icon: string;
  }

  interface BadgesBlockGroup {
    title: string;
    items: [BadgesBlockItem];
  }

  interface BadgesBlock extends UIBlock {
    template: "badgesblock";
    groups: [BadgesBlockGroup];
  }

  interface ContactBlock extends UIBlock {
    template: "contactblock";
    content: string;
  }

  interface FeaturesBlockItem {
    icon: string;
    title: string;
    content: string;
  }

  interface FeaturesBlock extends UIBlock {
    template: "featuresblock";
    items: [FeaturesBlockItem];
  }

  type Block = BadgesBlock | ContactBlock | FeaturesBlock;
}
