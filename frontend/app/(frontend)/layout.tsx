/* eslint-disable @next/next/no-sync-scripts */
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { ReactNode } from 'react'
import AuthProvider from '@/app/components/providers/AuthProvider'
import ReactQueryProvider from '@/app/components/providers/ReactQueryProvider'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FMS . Home',
  description: 'MVP',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        {/* {process.env.NODE_ENV === 'development' && (
          <script
            crossOrigin='anonymous'
            src='//unpkg.com/react-scan/dist/auto.global.js'
          />
        )} */}
      </head>
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-50 to-slate-100`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            {children}
            <ToastContainer />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
