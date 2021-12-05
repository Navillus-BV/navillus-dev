import { calculateReadingTime } from 'markdown-reading-time'

export function readMinutes(post) {
  const { minutes } = calculateReadingTime(post.astro.source)

  return minutes
}
