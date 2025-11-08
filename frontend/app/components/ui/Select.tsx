import { ComponentProps, forwardRef, Ref, SelectHTMLAttributes } from 'react'
import { Label } from './Label'
import { twMerge } from 'tailwind-merge'
import ChevronDownIcon from './icons/ChevronDownIcon'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm'

export type SelectFieldProps = {
  id: string
  label?: string
  labelClasses?: string
  type?: string
  className?: string
  disabled?: boolean
  showChevron?: boolean
} & SelectHTMLAttributes<HTMLSelectElement>

export type SelectProps = ComponentProps<'select'>

export const SelectField = forwardRef(
  (
    {
      id,
      label,
      className = '',
      labelClasses,
      disabled,
      showChevron,
      ...props
    }: SelectFieldProps,
    ref: Ref<HTMLSelectElement>
  ) => {
    return (
      <div className='relative'>
        {label && (
          <Label className={labelClasses} id={id}>
            {label}
          </Label>
        )}
        <select
          ref={ref}
          id={id}
          {...props}
          className={twMerge(
            formClasses,
            'focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-blue-400',
            className
          )}
          disabled={disabled}
        />

        {showChevron && (
          <ChevronDownIcon className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-700' />
        )}
      </div>
    )
  }
)
