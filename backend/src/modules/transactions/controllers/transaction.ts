import { type Context, type Next } from 'koa'

import { createTransactionUseCase } from '../use-cases/create-transaction-use-case'
import { createTransactionValidation } from './../validations/create-transaction-validation'
import { listTransactionValidation } from '../validations/list-transaction-validation'
import { listTransactionUsecase } from '../use-cases/list-transaction-use-case'
import {
  updateTransactionIdValidation,
  updateTransactionValidation,
  updateUserIdValidation,
} from '../validations/update-transaction-validation'
import { updateTransactionUseCase } from '../use-cases/update-transaction-use-case'

export const createTransaction = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const user_id = ctx.request.user_id as string
  const { description, value } = createTransactionValidation.parse(
    ctx.request.body,
  )

  const transaction = await createTransactionUseCase({
    user_id,
    description,
    value,
  })

  ctx.status = 200
  ctx.body = transaction
}

export const listTransaction = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const user_id = listTransactionValidation.parse(ctx.request.user_id)
  const transactions = await listTransactionUsecase({ user_id })

  ctx.status = 200
  ctx.body = transactions
}

export const updateTransaction = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const { id } = updateTransactionIdValidation.parse(ctx.request.params)
  const user_id = updateUserIdValidation.parse(ctx.request.user_id)
  const { description, value } = updateTransactionValidation.parse(
    ctx.request.body,
  )

  const transaction = await updateTransactionUseCase({
    id,
    user_id,
    description,
    value,
  })

  ctx.status = 201
  ctx.body = transaction
}
