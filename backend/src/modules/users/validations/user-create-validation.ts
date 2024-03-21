import { z } from 'zod'

export const userCreateValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type UserCreateData = z.infer<typeof userCreateValidation>
