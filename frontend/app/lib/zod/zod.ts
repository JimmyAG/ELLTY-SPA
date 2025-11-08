import { useForm, UseFormProps } from 'react-hook-form'
import { z, ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export interface UseZodFormProps<S extends z.ZodSchema>
  extends Exclude<UseFormProps<z.infer<S>>, 'resolver'> {
  schema: S
}

export const useZodForm = <S extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<S>) => {
  return useForm({
    ...formProps,
    resolver: zodResolver(schema),
  })
}
