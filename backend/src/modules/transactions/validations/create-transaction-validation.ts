import { z } from 'zod'

export const createTransactionValidation = z.object({
  description: z.string(),
  value: z.coerce.number(),
})

export type CreateTransactionData = z.infer<typeof createTransactionValidation>
