/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Session from '@/@types/next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type SessionParams = {
  session: Session
  token: JWT
}

/**
 * This is the config object that will be passed to
 * `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
 *
 * It was extracted to prevent authOptions object from being
 * exported out of the nextauth route.ts file ( it causes issues
 * when building on Vercel ) and also it is needed to get the session
 * on the server.
 * see: https://next-auth.js.org/configuration/nextjs#getserversession
 */
export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (
        credentials: Record<'email' | 'password', string> | undefined
      ): Promise<any | null> {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing Credentials')
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: 'include',
          }
        )

        const resObject = await res.json()

        if (res.status === 401) {
          throw new Error(
            `${JSON.stringify({ ok: res.ok, status: res.status, statusText: res.statusText })}`
          )
        }

        if (res.status === 404) {
          throw new Error(
            `${JSON.stringify({ ok: res.ok, status: res.status, statusText: res.statusText })}`
          )
        }

        if ((resObject.token, resObject.refreshToken)) {
          return resObject
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (user) {
        const customUser = user as unknown as {
          token: string
          refreshToken: string
          email: string
        }
        token.accessToken = customUser.token
        token.refreshToken = customUser.refreshToken
        token.email = customUser.email
      }
      return token
    },

    async session({ session, token }: SessionParams) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        }
      }

      return session
    },
  },
} satisfies NextAuthOptions

// fucntion to get session on the server
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}
