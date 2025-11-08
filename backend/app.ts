/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import http from 'http'
import https from 'https'
import { CustomError } from './utils/custom.error'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { Server as HTTPServer } from 'http'
import { Server as HTTPSServer } from 'https'
import { Request, Response, NextFunction } from 'express'
import userRouter from './routers/users.router'
import postRouter from './routers/posts.router'
import authMiddleware from './middlewares/auth'

dotenv.config()

const app = express()

app.use(cookieParser())

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(compression())
app.disable('x-powered-by')

app.use(function (req, res, next) {
    const origin = req.headers.origin
    if (
        origin &&
        (origin.includes('localhost') || origin.includes('railway.app'))
    ) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, authcode, refreshcode'
    )
    res.header('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    next()
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)

app.use(authMiddleware.verifyAuthToken)

app.get('/', (req, res) => {
    res.send('Success!')
})

let server: HTTPServer | HTTPSServer, PORT: number, protocol: 'http' | 'https'

if (process.env.NODE_ENV === 'development') {
    protocol = 'http'
    PORT = 3001
    server = http.createServer(app)
} else {
    protocol = 'http' // Railway
    PORT = parseInt(process.env.PORT) || 3001
    server = http.createServer(app)
}

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server is running on ${protocol}://0.0.0.0:${PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})
