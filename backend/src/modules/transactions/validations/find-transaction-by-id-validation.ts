import { z } from 'zod'

export const findTransactionByIdValidation = z.object({
  id: z
    .string({ required_error: 'Transaction id is required' })
    .cuid({ message: 'Invalid format' }),
})

const user_id = z
  .string({ required_error: 'User id is required' })
  .cuid({ message: 'Invalid format' })

export const findUserByIdValidation = user_id

export type FindTransactionByIdValidation = z.infer<
  typeof findTransactionByIdValidation
>
