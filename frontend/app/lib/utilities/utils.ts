import { Post, ViewPost } from '@/@types/post'

export const formatMediumDateTime = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return formatter.format(parsedDate)
}

export function buildPostTree(posts: Post[]): ViewPost[] {
  const map = new Map<number, ViewPost>()
  const roots: ViewPost[] = []

  posts.forEach((post) => {
    map.set(post.id, { ...post, children: [] })
  })

  // Assign each post to its parent's children array
  map.forEach((post) => {
    if (post.parent_id && map.has(post.parent_id)) {
      map.get(post.parent_id)!.children!.push(post)
    } else {
      roots.push(post)
    }
  })

  return roots
}
