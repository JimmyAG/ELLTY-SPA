import { ErrorCodes } from '../config/error.codes'
import { CustomError } from '../utils/custom.error'
import jwtUtil from '../utils/Jwt'

import { Request, Response, NextFunction } from 'express'

class AuthMiddleware {
    async verifyAuthToken(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method !== 'OPTIONS') {
                const token = req.cookies['next-auth.session-token']
                    ? req.cookies['next-auth.session-token']
                    : req.cookies.authtoken

                const decodedJWEToken =
                    await jwtUtil.extractAccessTokenFromJWE(token)
                const verifiedToken = await jwtUtil.verifyJwt(decodedJWEToken)

                if (verifiedToken) {
                    req.body.requiredInfo = {
                        userId: verifiedToken.id,
                        factoryId: verifiedToken.factoryId,
                    }
                    next()
                } else {
                    next(
                        new CustomError(
                            ErrorCodes.EXPIRED_ACCESS_TOKEN.code,
                            ErrorCodes.EXPIRED_ACCESS_TOKEN.status,
                            ErrorCodes.EXPIRED_ACCESS_TOKEN.message
                        )
                    )
                }
            } else {
                next()
            }
        } catch (error) {
            const _error = error
            next(
                new CustomError(
                    ErrorCodes.INVALID_ACCESS_TOKEN.code,
                    ErrorCodes.INVALID_ACCESS_TOKEN.status,
                    ErrorCodes.INVALID_ACCESS_TOKEN.message
                )
            )
        }
    }

    isTokenExpired(verifiedToken: { timestamp: number }): boolean {
        return verifiedToken.timestamp > Date.now() ? false : true
    }
}

const authMiddleware = new AuthMiddleware()
export default authMiddleware
