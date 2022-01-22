import md from 'nano-markdown'
import { calculateReadingTime } from 'markdown-reading-time'
import type { WithContent } from './cms'

type Markdown = string

export function mdToHtml(content: Markdown) {
  return content && md(content)
}

export function readMinutesForPage(page: WithContent<CMS.Page>) {
  return readMinutes(page.content.md)
}

export function readMinutes(content: Markdown) {
  const { minutes } = calculateReadingTime(content)
  return minutes
}
