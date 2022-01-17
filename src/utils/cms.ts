export function isPublished(page: CMS.Page) {
  return page.published == true;
}

export function hasPermalink(permalink: string) {
  return function (page: CMS.Page) {
    return page.permalink === permalink;
  };
}
