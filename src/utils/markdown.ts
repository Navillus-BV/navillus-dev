import md from 'nano-markdown'
import { calculateReadingTime } from 'markdown-reading-time'

type Markdown = string

export function mdToHtml(content: Markdown) {
  return content && md(content)
}

export function readMinutesForPage(page: CMS.Page) {
  return readMinutes(page.content.md)
}

export function readMinutes(content: Markdown) {
  const { minutes } = calculateReadingTime(content)
  return minutes
}
