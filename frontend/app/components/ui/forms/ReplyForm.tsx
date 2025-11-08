'use client'

import { z } from 'zod'
import Form from './form-components/Form'
import FormInput from './form-components/FormInput'
import FormSelect from './form-components/FormSelect'
import { replySchema } from '@/app/lib/zod/schema'
import { useZodForm } from '@/app/lib/zod/zod'
import { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Button } from '../Button'
import { createPost } from '@/app/lib/api/post'
import { queryClient } from '@/app/lib/api/react_query'

type ReplyFormSchemaType = z.infer<typeof replySchema>

interface ReplyFormProps {
  parentId: number
}

const ReplyForm: FC<ReplyFormProps> = ({ parentId }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const form = useZodForm({
    schema: replySchema,
  })
  const { control } = form

  const handleSubmit: SubmitHandler<ReplyFormSchemaType> = async (data) => {
    setLoading(true)

    if (data.value && typeof data.value === 'number') {
      const response = await createPost({ ...data, parentId })

      if (response.status == 201) {
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
    }
    setLoading(false)
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className='flex items-center justify-end gap-2'>
        <div className='flex min-w-48 items-center'>
          <FormSelect<ReplyFormSchemaType>
            options={[
              { label: '+', value: '+' },
              { label: '-', value: '-' },
              { label: '*', value: '*' },
              { label: '/', value: '/' },
            ]}
            control={control}
            name={'operation'}
            placeholder={'+'}
          />
        </div>

        <div className='mb-1'>
          <FormInput
            labelClassName='mb-0 pb-0'
            label=''
            type='number'
            className='rounded'
            placeholder='Number'
            {...form.register('value')}
          />
        </div>

        <Button
          loading={loading}
          type='submit'
          className='rounded bg-blue-500 px-2 text-white hover:bg-blue-600'
        >
          Reply
        </Button>
      </div>
    </Form>
  )
}

export default ReplyForm
