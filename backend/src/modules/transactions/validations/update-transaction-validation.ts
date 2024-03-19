import { z } from 'zod'

export const updateTransactionIdValidation = z.object({
  id: z
    .string({ required_error: 'Transaction id is required' })
    .cuid({ message: 'Invalid format' }),
})

const user_id = z
  .string({ required_error: 'User id is required' })
  .cuid({ message: 'Invalid format' })

export const updateUserIdValidation = user_id

export const updateTransactionValidation = z.object({
  description: z.string().optional(),
  value: z.coerce.number().optional(),
})

export type UpdateTransactionData = z.infer<typeof updateTransactionValidation>
