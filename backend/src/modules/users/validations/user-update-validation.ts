import { z } from 'zod'

const user_id = z
  .string({ required_error: 'User id is required' })
  .cuid({ message: 'Invalid format' })

export const updateUserIdValidation = user_id

export const userUpdateValidation = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
})

export type UserUpdateIdParam = z.infer<typeof updateUserIdValidation>
export type UserUpdateData = z.infer<typeof userUpdateValidation>
