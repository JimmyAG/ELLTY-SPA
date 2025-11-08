import { Post } from '@/@types/post'

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const responseBody = await response.json()

    return {
      ok: response.ok,
      status: response.status,
      message: responseBody.message,
      posts: responseBody.posts as Post[],
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createPost = async (data: {
  operation?: string
  value?: number
  parentId?: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/new`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    )

    const responseBody = await response.json()
    return {
      ok: response.ok,
      status: response.status,
      post: responseBody.post,
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
