'use client'

import { useZodForm } from '@/app/lib/zod/zod'
import Form from './form-components/Form'
import FormInput from './form-components/FormInput'
import { registerSchema } from '@/app/lib/zod/schema'
import { SubmitHandler } from 'react-hook-form'
import FormSubmitButton from './form-components/SubmitButton'
import { z } from 'zod'
import EyeIcon from '../icons/EyeIcon'
import { useState } from 'react'
import EyeSlashIcon from '../icons/EyeSlashIcon'
import { notify } from '@/app/lib/toast'
import { useRouter } from 'next/navigation'
import { signUp } from '@/app/lib/api/user'

type signupFormSchemaType = z.infer<typeof registerSchema>

const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const form = useZodForm({
    schema: registerSchema,
  })
  const router = useRouter()

  const handleSubmit: SubmitHandler<signupFormSchemaType> = async (data) => {
    setLoading(true)

    try {
      const res = await signUp(data)

      if (res.ok) {
        notify(res.message, 'success')
        notify('You can now login to your newly created account!', 'info')
        notify('You will soon be directed to the login page!', 'info')
        setTimeout(() => {
          router.push('/auth/login')
        }, 5000)
      } else {
        notify(res.message, 'failure')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notify(err.message || 'Something went wrong', 'failure', {
        draggable: true,
      })
    } finally {
      setLoading(false)
    }
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

          <FormInput
            label='Confirm Password'
            required
            type={showPassword ? 'text' : 'password'}
            {...form.register('confirmPassword')}
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
          Sign Up
        </FormSubmitButton>
      </div>
    </Form>
  )
}

export default SignupForm
