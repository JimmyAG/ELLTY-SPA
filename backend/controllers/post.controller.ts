import { Request, Response, NextFunction } from 'express'
import postService from '../services/posts.service'

class PostController {
    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getAllPosts()

            if (posts) {
                res.status(200).send({
                    message: 'Posts retrieved successfully',
                    posts,
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Create a post / reply
    async createNewPost(req: Request, res: Response, next: NextFunction) {
        const body = req.body
        try {
            const newPost = postService.createNewPost(body)

            return res.status(201).send({
                message: 'A new post created successfully',
                post: newPost,
            })
        } catch (err) {
            next(err)
        }
    }
}

const postController = new PostController()
export default postController
