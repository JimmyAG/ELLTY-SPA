import express from 'express'
import schemaValidator from '../utils/schema.validator'
import userController from '../controllers/user.controller'
import { Request, Response, NextFunction } from 'express'
import { loginSchema, signUpSchema } from '../schema/login.schema'

const router = express.Router()

router.post(
    '/login',
    [schemaValidator.validate(loginSchema)],
    (req: Request, res: Response, next: NextFunction) => {
        userController.login(req, res, next)
    }
)

router.post(
    '/signup',
    [schemaValidator.validate(signUpSchema)],
    (req: Request, res: Response, next: NextFunction) => {
        userController.signup(req, res, next)
    }
)

export default router
