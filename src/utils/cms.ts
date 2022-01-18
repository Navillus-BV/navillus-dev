export function isPublished(page: CMS.Page) {
  return page.published == true;
}

export function hasPermalink(permalink: string) {
  return function (page: CMS.Page) {
    return page.permalink === permalink;
  };
}

type AstroPage = CMS.Page & {
  astro: any;
  Content: any;
  content: {
    source: string;
    html: string;
  };
  file: URL;
};

export function getPage(page: AstroPage): CMS.Page {
  const { astro, content, Content, file, ..._page } = page;

  return {
    ..._page,
    content: content.html,
  };
}
