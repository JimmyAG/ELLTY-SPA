import express from 'express'
import schemaValidator from '../utils/schema.validator'
import { Request, Response, NextFunction } from 'express'
import createNewPostSchema from '../schema/post.schema'
import postController from '../controllers/post.controller'

const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    postController.getAllPosts(req, res, next)
})

router.post(
    '/new',
    [schemaValidator.validate(createNewPostSchema)],
    (req: Request, res: Response, next: NextFunction) => {
        postController.createNewPost(req, res, next)
    }
)

export default router
