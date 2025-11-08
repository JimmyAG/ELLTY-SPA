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
    const allowedOriginsPattern =
        /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/
    const origin = req.headers.origin

    res.header('X-XSS-Protection', '1; mode=block')
    res.header('X-Frame-Options', 'deny')
    res.header('X-Content-Type-Options', 'nosniff')

    if (allowedOriginsPattern.test(origin))
        res.header('Access-Control-Allow-Origin', origin)

    res.header(
        'Access-Control-Allow-Methods',
        'POST, PUT, DELETE, GET, OPTIONS, PATCH'
    )
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, authcode, refreshcode'
    )
    res.header('Access-Control-Allow-Credentials', 'true')

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

server.listen(PORT, () => {
    console.log(`Express server is running on ${protocol}://localhost:${PORT}`)
})
server.listen(PORT, () => {
    console.log(`Express server is running on ${protocol}://localhost:${PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})
