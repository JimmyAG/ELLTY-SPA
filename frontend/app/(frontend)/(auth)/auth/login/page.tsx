import LoginForm from '@/app/components/ui/forms/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[#F2F2F2]'>
      <div className='top-22 flex flex-col gap-4 rounded-lg border bg-white p-5 md:w-[400px] md:p-10'>
        <div>
          <p className='text-xs antialiased'>Welcome back! 👋</p>
          <h1 className='font-bold tracking-wide antialiased'>
            Login to your account
          </h1>
        </div>

        <LoginForm />

        <p>
          Don't have an account?{' '}
          <Link className='text-blue-500 underline' href='/auth/signup'>
            signup
          </Link>
        </p>
      </div>
    </main>
  )
}
