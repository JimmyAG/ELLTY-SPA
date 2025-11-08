'use client'

import { getAllPosts } from '@/app/lib/api/post'
import { useQuery } from '@tanstack/react-query'
import IconSpinning from '../../icons/SpinningIcon'
import PostsView from './PostsView'
import { Button } from '../../Button'

import { FC, useState } from 'react'
import Session from '@/@types/next-auth'
import DiscussionForm from '../../forms/DiscussionForm'

interface DiscussionDashboardsProps {
  session: Session
}

const DiscussionDashboard: FC<DiscussionDashboardsProps> = ({ session }) => {
  const [newDiscussion, setNewDiscussion] = useState<boolean>(false)
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })

  if (isLoading)
    return (
      <div className='flex flex-col items-center p-24'>
        <IconSpinning color='black' height='5' width='5' />
      </div>
    )

  if (error)
    return (
      <div className='flex flex-col items-center p-24'>
        An error occurred while loading posts!
      </div>
    )

  return (
    <div className='flex h-full w-full flex-col gap-2'>
      <div className='h-30 flex w-full items-center justify-end'>
        {newDiscussion && (
          <div className='mb-4 flex w-full'>
            <DiscussionForm />
          </div>
        )}

        <Button
          style={{
            maxHeight: '50px',
            maxWidth: '200px',
            cursor: !session ? 'not-allowed' : 'pointer',
            opacity: !session ? 0.5 : 1,
          }}
          disabled={!session}
          onClick={() => setNewDiscussion(!newDiscussion)}
        >
          Start a new discussion
        </Button>
      </div>

      <PostsView posts={data?.posts} />
    </div>
  )
}

export default DiscussionDashboard
