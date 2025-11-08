'use client'

import { FC, useRef, useState } from 'react'
import BurgerMenuIcon from './icons/BurgerMenuIcon'
import Sidebar from './Sidebar'
import useOnClickOutside from '@/app/lib/hooks/useOutsideClick'

const SidebarButton: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(menuRef, () => setSidebarOpen(false))

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <button
        className='inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        onClick={() => toggleSidebar()}
        type='button'
      >
        <span className='sr-only'>Open main menu</span>
        <BurgerMenuIcon viewBox='0 0 20 20' />
      </button>
      <Sidebar isOpen={isSidebarOpen} ref={menuRef} onClose={closeSidebar} />
    </>
  )
}

export default SidebarButton
