import Link from 'next/link'
import SidebarButton from './SidebarButton'

const BaseNav = () => {
  return (
    <nav className='relative z-10 flex h-auto w-full justify-between border-b-[1px] border-gray-200 px-4 pb-3 pt-4 text-gray-500'>
      <div className='mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between'>
        <Link className='flex items-center' href='/'>
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            Numbers Discussion
          </span>
        </Link>
        <div className='flex items-center lg:order-2'>
          <SidebarButton />
        </div>
      </div>
    </nav>
  )
}

export default BaseNav
