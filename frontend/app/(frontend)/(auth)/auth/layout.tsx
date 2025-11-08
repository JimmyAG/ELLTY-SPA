import type { Metadata } from 'next'
import '../../globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'login',
  description: 'Login page',
}

export default function LoginPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}

      <ToastContainer />
    </>
  )
}
