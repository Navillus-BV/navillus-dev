export function isPublished(page: CMS.Page) {
  return page.published == true
}

export function hasPermalink(permalink: string) {
  return function (page: CMS.Page) {
    return page.permalink === permalink
  }
}

type AstroContent = {
  astro: any
  Content: any
  content: {
    source: string
    html: string
  }
  file: URL
}

type MarkdownContent = {
  content: {
    html: string
    md: string
  }
}

export type WithContent<T> = T & MarkdownContent

export function getPage(page: AstroContent & CMS.Page): WithContent<CMS.Page> {
  const { astro, content, Content, file, ...rest } = page

  return {
    ...rest,
    content: {
      html: content.html,
      md: content.source,
    },
  }
}

export function dereferencePage(pages: [AstroContent & CMS.Page]) {
  return function (ref: string): WithContent<CMS.Page> | undefined {
    const target = ref.replace(/^\/+/g, '')

    const page = pages.find(({ file }) => {
      return file.pathname.replace(/^\/+/g, '') === target
    })

    return page && getPage(page)
  }
}

export function normalizeNavigationLink(pages: [AstroContent & CMS.Page]) {
  const getPage = dereferencePage(pages)

  return function (item: CMS.NavigationLink) {
    const page = getPage(item.page)
    return page
      ? {
          ...item,
          page: [page.permalink, item.id].filter(Boolean).join('#'),
        }
      : item
  }
}
