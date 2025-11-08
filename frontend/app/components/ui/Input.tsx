import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const disabled =
  'focus:outline-none focus:ring-current border-hidden bg-transparent px-0 font-semibold'
const enabled =
  'focus:border-blue-400 bg-white focus:outline-none focus:ring-blue-400'
const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm'

export type InputProps = ComponentProps<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, ...props }, ref) => {
    const mergedClasses = twMerge(
      formClasses,
      props.readOnly ? disabled : enabled,
      className
    )

    return (
      <input
        className={mergedClasses}
        disabled={props.readOnly}
        id={id}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Input
