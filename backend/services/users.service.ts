/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtUtil from '../utils/Jwt'
import { config } from '../config/server.config'
import bcrypt from 'bcrypt'
import userRepository from '../repositories/users.repository'
import { CustomError } from '../utils/custom.error'
import { ErrorCodes } from '../config/error.codes'
import { dbInsert } from '../db/db'

class UserService {
    async login(credentials: { email: string; password: string }) {
        try {
            const user = userRepository.findUserByEmailOrUserName({
                email: credentials.email,
            })

            if (
                user == null ||
                !(await bcrypt.compare(
                    credentials.password,
                    user?.password_hash
                ))
            ) {
                throw new CustomError(
                    ErrorCodes.INVALID_EMAIL_OR_PASSWORD.code,
                    ErrorCodes.INVALID_EMAIL_OR_PASSWORD.status,
                    ErrorCodes.INVALID_EMAIL_OR_PASSWORD.message,
                    'Unauthorized'
                )
            }

            const accessToken = await this.getLoginToken(
                user,
                config.expirePeriod.authToken
            )
            const refreshToken = await this.getLoginToken(
                user,
                config.expirePeriod.refreshToken
            )
            return this.buildLoginResponse(accessToken, refreshToken, user)
        } catch (err) {
            throw err
        }
    }

    async signup(credentials: {
        email: string
        password: string
        confirmPassword: string
    }) {
        const { email, password, confirmPassword } = credentials

        // 1️⃣ Password confirmation
        if (password !== confirmPassword) {
            throw new CustomError(
                'PASSWORD_MISMATCH',
                404,
                'Bad Request',
                'Passwords do not match'
            )
        }

        // 2️⃣ Check if user already exists
        const existingUser = userRepository.findUserByEmailOrUserName({
            email: credentials.email,
        })

        if (existingUser) {
            throw new CustomError(
                'USER_ALREADY_EXISTS',
                409,
                'Conflict',
                'User already exists'
            )
        }

        const password_hash = await bcrypt.hash(password, 10)

        const info = dbInsert(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, password_hash]
        ) as { lastInsertRowid: number }

        const newUser = {
            id: info.lastInsertRowid,
            email,
            created_at: new Date().toISOString(),
        }

        return newUser
    }

    private async getLoginToken(user: any, tokenExpirationPeriod: number) {
        const token = await jwtUtil.generateJwt({
            id: user.id,
            timestamp: Date.now() + tokenExpirationPeriod,
        })
        return token
    }

    private buildLoginResponse(
        accessToken: string,
        refreshToken: string,
        user: any
    ) {
        return {
            email: user.email,
            token: accessToken,
            refreshToken: refreshToken,
        }
    }
}

const userService = new UserService()
export default userService
