import { z } from 'zod'

export const userDeleteIdParamValidation = z.object({
  user_id: z.string().cuid(),
})

export type UserUpdateIdParam = z.infer<typeof userDeleteIdParamValidation>
