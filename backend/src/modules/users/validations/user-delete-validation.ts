import { z } from 'zod'

const user_id = z
  .string({ required_error: 'User id is required' })
  .cuid({ message: 'Invalid format' })

export const deleteUserIdValidation = user_id

export type UserUpdateIdParam = z.infer<typeof deleteUserIdValidation>
