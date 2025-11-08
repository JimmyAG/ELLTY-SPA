import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().min(1, 'Please enter a valid email!'),
  password: z.string().min(5, 'Password must be at least 5 characters long!'),
})

export const registerSchema = z
  .object({
    email: z.string().email().min(1, 'Please enter a valid email!'),
    password: z
      .string()
      .min(5, 'Password must be at least 5 characters long')
      .refine(
        (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
        'Password must contain at least one symbol!'
      )
      .refine(
        (val) => /[A-Z]/.test(val),
        'Password must contain at least one upper-case character!'
      )
      .refine(
        (val) => /[a-z]/.test(val),
        'Password must contain at least one lower-case character!'
      )
      .refine(
        (val) => /[0-9]/.test(val),
        'Password must contain at least one number!'
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password did not match!',
        path: ['confirmPassword'],
      })
    }
  })

export const replySchema = z.object({
  parentId: z.number().optional(),
  operation: z.enum(['+', '-', '*', '/'], {
    invalid_type_error: 'Please select a valid operation symbol',
  }),
  value: z
    .number()
    .transform((value) => (!value ? undefined : value))
    .or(z.coerce.number({ message: 'must be a number.' })),
})

export const discussionSchema = z.object({
  value: z
    .number()
    .transform((value) => (!value ? undefined : value))
    .or(z.coerce.number({ message: 'must be a number.' })),
})
