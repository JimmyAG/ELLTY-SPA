'use client'

import DiscussionDashboard from '@/app/components/ui/dashboards/discussion/DiscussionsDashboard'
import IconSpinning from '@/app/components/ui/icons/SpinningIcon'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === 'loading')
    return (
      <div className='flex flex-col items-center p-24'>
        <IconSpinning color='black' height='5' width='5' />
      </div>
    )

  return (
    <div className='flex flex-col items-center px-20 pt-12'>
      {`WELCOME, ${session ? session.user.email?.split('@')[0] : 'Guest'}`}
      <div className='flex flex-col'>
        {status === 'unauthenticated' &&
          'You are not registered, please login or register to create / comment'}
      </div>

      <div className='mt-10 flex w-full items-center justify-center'>
        <DiscussionDashboard session={session} />
      </div>
    </div>
  )
}
