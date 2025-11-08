import SignupForm from '@/app/components/ui/forms/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[#F2F2F2]'>
      <div className='top-22 flex flex-col gap-4 rounded-lg border bg-white p-5 md:w-[400px] md:p-10'>
        <div>
          <h1 className='font-bold tracking-wide antialiased'>
            Create a new account
          </h1>
        </div>

        <SignupForm />

        <p>
          Do you already have an account?{' '}
          <Link className='text-blue-500 underline' href='/login'>
            login
          </Link>
        </p>
      </div>
    </main>
  )
}
