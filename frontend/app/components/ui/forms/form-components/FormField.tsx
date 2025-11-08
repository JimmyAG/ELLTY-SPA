import { FC, PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface UseFormFieldProps extends PropsWithChildren {
  className?: string
  label: string
  labelClassName?: string
  name: string
}

export interface FormFieldProps extends UseFormFieldProps {
  className?: string
  id: string
}

export const useFormField = <P extends UseFormFieldProps>(props: P) => {
  const { className, label, name, ...otherProps } = props
  const id = name

  return {
    formFieldProps: { className, id, label, name },
    childProps: { id, name, ...otherProps },
  }
}

const FormField: FC<FormFieldProps> = ({
  children,
  className,
  id,
  label,
  labelClassName,
  name,
}) => {
  const divClassName = className ? `${className} space-y-1` : 'space-y-1'
  const formContext = useFormContext()
  const mergedLabelClassName = twMerge(
    'mb-1 block text-left text-sm font-medium text-gray-700',
    labelClassName
  )
  const state = formContext.getFieldState(name)

  return (
    <div className={divClassName}>
      <label className={mergedLabelClassName} htmlFor={id}>
        {label}
      </label>

      {children}

      {state.error && (
        <p className='text-sm text-red-600'>{state.error.message}</p>
      )}
    </div>
  )
}

export default FormField
