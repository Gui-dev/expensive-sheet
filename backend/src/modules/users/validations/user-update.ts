import { z } from 'zod'

export const userUpdateIdParamValidation = z.object({
  user_id: z.string().cuid(),
})

export const userUpdateValidation = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
})

export type UserUpdateIdParam = z.infer<typeof userUpdateIdParamValidation>
export type UserUpdateData = z.infer<typeof userUpdateValidation>
