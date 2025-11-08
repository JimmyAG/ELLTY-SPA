'use client'

import { useZodForm } from '@/app/lib/zod/zod'
import Form from './form-components/Form'
import FormInput from './form-components/FormInput'
import { loginSchema } from '@/app/lib/zod/schema'
import { SubmitHandler } from 'react-hook-form'
import FormSubmitButton from './form-components/SubmitButton'
import { z } from 'zod'
import EyeIcon from '../icons/EyeIcon'
import { useState } from 'react'
import EyeSlashIcon from '../icons/EyeSlashIcon'
import { signIn, SignInResponse } from 'next-auth/react'
import { notify } from '@/app/lib/toast'
import { useRouter } from 'next/navigation'

type loginFormSchemaType = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const form = useZodForm({
    schema: loginSchema,
  })
  const router = useRouter()

  const handleSubmit: SubmitHandler<loginFormSchemaType> = async (data) => {
    setLoading(true)
    signIn('credentials', {
      callbackUrl: '/',
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((response: SignInResponse | undefined) => {
      if (response && response.ok && !response.error) {
        setLoading(false)
        router.push('/')
      } else if (response && response.error) {
        const parsedError = JSON.parse(response.error)

        if (parsedError.status === 404) {
          notify(`No user was found with the email: ${data.email}`, 'failure', {
            draggable: true,
          })
        }

        if (parsedError.status === 401) {
          notify(`Invalid password or email`, 'failure', {
            draggable: true,
          })
        }
      }

      setLoading(false)
    })
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>
        <FormInput
          label='Email'
          placeholder='johndoe@email.com'
          required
          type='text'
          {...form.register('email')}
        />

        <div className='relative'>
          <FormInput
            label='Password'
            required
            type={showPassword ? 'text' : 'password'}
            {...form.register('password')}
          />

          <div
            className='absolute right-3 top-[45px] -translate-y-1/2 transform cursor-pointer bg-white'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon height={20} width={20} />
            ) : (
              <EyeSlashIcon height={20} width={20} />
            )}
          </div>
        </div>

        <FormSubmitButton className='h-10 w-full text-lg' loading={loading}>
          Login
        </FormSubmitButton>
      </div>
    </Form>
  )
}

export default LoginForm
