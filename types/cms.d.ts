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
}
