import userService from '../services/users.service'
import { Request, Response, NextFunction } from 'express'

class UserController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await userService.login(req.body)
            res.cookie('token', response.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            res.cookie('refreshToken', response.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })

            return res.status(200).send({ ...response })
        } catch (err) {
            next(err)
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await userService.signup(req.body)

            if (response.id) {
                return res.status(201).send({
                    message: 'User account was created successfully',
                    user: { ...response },
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

const userController = new UserController()
export default userController
