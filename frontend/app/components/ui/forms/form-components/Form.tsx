import { ComponentProps } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

export interface FormProps<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

const Form = <T extends FieldValues>({
  children,
  form,
  onSubmit,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onError={(errors) => {
          console.error('Form errors:', errors)
        }}
        noValidate
        {...props}
      >
        <fieldset className='min-w-0' disabled={form.formState.isSubmitting}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}

export default Form
