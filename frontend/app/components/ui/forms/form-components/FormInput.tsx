import { FC, forwardRef } from 'react'
import Base, { InputProps } from '../../Input'
import { useFormField, UseFormFieldProps } from './FormField'
import FormField from './FormField'

interface FormInputProps extends UseFormFieldProps, InputProps {
  childClassName?: string
  labelClassName?: string
  name: string
}

const FormInput: FC<FormInputProps> = forwardRef<
  HTMLInputElement,
  FormInputProps
>((props, ref) => {
  const {
    formFieldProps,
    childProps: { childClassName, labelClassName, ...rest },
  } = useFormField(props)

  return (
    <FormField labelClassName={labelClassName} {...formFieldProps}>
      <Base className={childClassName} ref={ref} {...rest} />
    </FormField>
  )
})

export default FormInput
