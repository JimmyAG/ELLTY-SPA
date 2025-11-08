import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LabelProps = {
  id: string
  className?: string
  children: ReactNode
}
export function Label({ id, className = '', children }: LabelProps) {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        'mb-3 block text-sm font-medium text-gray-700',
        className
      )}
    >
      {children}
    </label>
  )
}
