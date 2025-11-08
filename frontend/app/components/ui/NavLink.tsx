'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavLinkProps {
  linkClasses?: string
  href?: string
  label: string
}

const NavLink: FC<NavLinkProps> = ({ linkClasses, href, label }) => {
  const pathname = usePathname().toLowerCase()
  const isActive = href && href !== '#' && pathname.includes(href)
  const mergedLinkClasses = twMerge(
    'lg:hover:text-primary-700 block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white',
    linkClasses
  )

  const wrapperClasses = twMerge(
    'transition',
    isActive && 'pb-2 border-b-[3px] border-black leading-tight'
  )

  return (
    <li className={wrapperClasses}>
      <Link href={href || '#'} className={mergedLinkClasses}>
        {label}
      </Link>
    </li>
  )
}

export default NavLink
