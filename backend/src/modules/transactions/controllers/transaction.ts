import { type Context, type Next } from 'koa'
import { createTransactionService } from '../use-cases/create-transaction-service'
import { createTransactionValidation } from './../validations/create-transaction-validation'

export const createTransaction = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const user_id = ctx.request.user_id as string
  const { description, value } = createTransactionValidation.parse(
    ctx.request.body,
  )

  const transaction = await createTransactionService({
    user_id,
    description,
    value,
  })

  ctx.status = 200
  ctx.body = transaction
}
