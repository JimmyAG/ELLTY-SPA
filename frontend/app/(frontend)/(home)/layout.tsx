import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'
import BaseNav from '@/app/components/ui/BaseNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Number Discussion',
  description: 'Weird number discussions',
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className={inter.className}>
      <div className='flex h-12 w-full items-center justify-start'>
        <BaseNav />
      </div>
      {children}
    </main>
  )
}
