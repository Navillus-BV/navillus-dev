import { calculateReadingTime } from 'markdown-reading-time'

export function readMinutes(post) {
  const { minutes } = calculateReadingTime(Post.astro.source)

  return minutes
}
