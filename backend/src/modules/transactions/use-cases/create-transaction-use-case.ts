import { type Transaction } from '@prisma/client'

import { AppError } from '../../../shared/error/app-error'
import { findUserByIdRepository } from '../../users/repositories/find-user-by-id'
import { createTransactionRepository } from '../repositories/create-transaction-repository'

interface ICreateTransactionService {
  user_id: string
  description: string
  value: number
}

export const createTransactionUseCase = async ({
  user_id,
  description,
  value,
}: ICreateTransactionService): Promise<Transaction> => {
  const user_already_exists = await findUserByIdRepository({ user_id })

  if (!user_already_exists) {
    throw new AppError('User unauthorized', 403)
  }

  const transaction = await createTransactionRepository({
    user_id: user_already_exists.id,
    description,
    value,
  })

  return transaction
}
