import { type Transaction } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { findTransactionByIdRepository } from '../repositories/find-transaction-by-id-repository'
import { updateTransactionRepository } from '../repositories/update-transaction-repository'
import { findUserByIdRepository } from '../../users/repositories/find-user-by-id-repository'

interface IUpdateTransactionUseCase {
  id: string
  user_id: string
  description?: string
  value?: number
}

export const updateTransactionUseCase = async ({
  id,
  user_id,
  description,
  value,
}: IUpdateTransactionUseCase): Promise<Transaction> => {
  const user_exists = await findUserByIdRepository({ user_id })

  if (!user_exists) {
    throw new AppError('User unauthorized', 403)
  }

  const transaction_exists = await findTransactionByIdRepository({
    id,
    user_id,
  })

  if (!transaction_exists) {
    throw new AppError('Transaction not found', 404)
  }

  const transaction = await updateTransactionRepository({
    id,
    user_id,
    description: description ?? transaction_exists.description,
    value: Number(value) ?? transaction_exists.value,
  })

  return transaction
}
