export interface Post {
  id: number
  parent_id: number
  user_id: number
  operation?: string
  operand?: number
  created_at: string
  result: number
}

export interface ViewPost extends Post {
  children?: Post[]
}
