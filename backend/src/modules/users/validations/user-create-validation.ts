import { z } from 'zod'

export const userCreateValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export type UserCreateData = z.infer<typeof userCreateValidation>
