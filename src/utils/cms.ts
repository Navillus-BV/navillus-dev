export function isPublished(page: CMS.Page) {
  return page.published == true;
}

export function hasPermalink(permalink: string) {
  return function (page: CMS.Page) {
    return page.permalink === permalink;
  };
}

type AstroContent = {
  astro: any;
  Content: any;
  content: {
    source: string;
    html: string;
  };
  file: URL;
};

export function getAuthor(author: AstroContent & CMS.Author): CMS.Author {
  const { astro, content, Content, file, ...rest } = author;

  return rest;
}

export function getPage(page: AstroContent & CMS.Page): CMS.Page {
  const { astro, content, Content, file, ...rest } = page;

  return {
    ...rest,
    content: {
      html: content.html,
      md: content.source,
    },
  };
}
