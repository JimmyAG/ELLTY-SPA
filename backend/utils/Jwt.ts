import jwt from 'jsonwebtoken'
import fs from 'fs'
import util from 'util'

const ALGORITHM = 'RS256'

class JwtUtil {
    async generateJwt(data: { id: number | string; timestamp: number }) {
        const privateKey = fs.readFileSync('./private.pem')

        const signToken = util
            .promisify(jwt.sign)
            .bind(null, data, privateKey, { algorithm: ALGORITHM })

        const token = await signToken()
        return token
    }

    async verifyJwt(token: string) {
        const cert = fs.readFileSync('./public.pem') // get public key

        const verifyToken = await util
            .promisify(jwt.verify)
            .bind(null, token, cert, { algorithms: ALGORITHM })

        const payload = await verifyToken()

        return payload
    }

    async extractAccessTokenFromJWE(token: string) {
        try {
            const { decode } = await import('next-auth/jwt')

            const decodedJWE = await decode({
                token: token,
                secret: process.env.NEXTAUTH_SECRET,
            })

            return decodedJWE.accessToken as string
        } catch (error) {
            throw error
        }
    }
}

const jwtUtil = new JwtUtil()

export default jwtUtil
