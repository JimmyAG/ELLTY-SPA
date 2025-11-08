'use client'

import { z } from 'zod'
import Form from './form-components/Form'
import FormInput from './form-components/FormInput'
import { discussionSchema } from '@/app/lib/zod/schema'
import { useZodForm } from '@/app/lib/zod/zod'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Button } from '../Button'
import { createPost } from '@/app/lib/api/post'
import { queryClient } from '@/app/lib/api/react_query'

type DiscussionFormSchemaType = z.infer<typeof discussionSchema>

const DiscussionForm = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const form = useZodForm({
    schema: discussionSchema,
  })

  const handleSubmit: SubmitHandler<DiscussionFormSchemaType> = async (
    data
  ) => {
    setLoading(true)
    if (typeof data.value === 'number') {
      const response = await createPost({ value: data.value })

      if (response.status == 201) {
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
    }

    setLoading(false)
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className='flex h-12 w-full items-center gap-4'>
        <FormInput
          defaultValue={0}
          type='number'
          className='rounded p-1'
          placeholder='Number'
          label='New Discussion'
          {...form.register('value')}
        />

        <div className='mt-5'>
          <Button
            loading={loading}
            type='submit'
            className='rounded bg-blue-500 px-2 text-white hover:bg-blue-600'
          >
            Create
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default DiscussionForm
