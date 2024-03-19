import { z } from 'zod'

const user_id = z
  .string({ required_error: 'User id is required' })
  .cuid({ message: 'Invalid format' })

export const listTransactionValidation = user_id

export type ListTransactionData = z.infer<typeof listTransactionValidation>
