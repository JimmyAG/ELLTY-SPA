import { forwardRef } from 'react'
import CloseIcon from './icons/CloseIcon'
import { Button } from './Button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, onClose }, ref) => {
    const { data: session } = useSession()
    const router = useRouter()

    return (
      <div
        className={`fixed right-0 top-0 z-20 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } dark:bg-gray-800`}
        ref={ref}
      >
        <div className='flex items-center justify-between py-4 pl-6 pr-2'>
          <span className='text-xl font-semibold text-gray-800 dark:text-white'>
            Menu
          </span>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          >
            <span className='sr-only'>Close menu</span>
            <CloseIcon
              colorFill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
              className='h-6 w-6'
            />
          </button>
        </div>
        <div className='flex h-full flex-col'>
          <div>
            <ul className='mt-4 space-y-2 px-4'>
              <li className='rounded-md px-4 hover:bg-gray-100'>
                <a
                  href='/'
                  className='hover:text-primary-700 block py-2 text-gray-700 dark:text-gray-400 dark:hover:text-white'
                >
                  Home
                </a>
              </li>
            </ul>
          </div>

          <div className='mt-4 flex justify-end pr-2'>
            <Button
              className='mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5'
              onClick={() => {
                if (session) {
                  signOut()
                } else {
                  router.push('/auth/login')
                }
              }}
            >
              {session ? 'Log out' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
