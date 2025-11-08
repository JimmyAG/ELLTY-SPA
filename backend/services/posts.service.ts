import postRepository from '../repositories/posts.repository'

class PostService {
    async getAllPosts() {
        const posts = postRepository.getAllPosts()
        return posts
    }

    async createNewPost(data?: {
        parentId?: number
        operation?: string
        value: number
    }) {
        const newPost = postRepository.createNewPost(data)

        return newPost
    }
}

const postService = new PostService()
export default postService
