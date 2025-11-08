import { FC } from 'react'
import { Button, ButtonProps } from '../../Button'

export type FormSubmitButtonProps = Omit<ButtonProps, 'type'>

const FormSubmitButton: FC<FormSubmitButtonProps> = ({ ...props }) => {
  return <Button {...props} />
}

export default FormSubmitButton
