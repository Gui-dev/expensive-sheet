import { type Transaction } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { findUserByIdRepository } from '../../users/repositories/find-user-by-id-repository'
import { findTransactionByIdRepository } from '../repositories/find-transaction-by-id-repository'

interface IFindTransactionByIdUseCase {
  id: string
  user_id: string
}

export const findTransactionByIdUseCase = async ({
  id,
  user_id,
}: IFindTransactionByIdUseCase): Promise<Transaction> => {
  const user_exists = await findUserByIdRepository({ user_id })

  if (!user_exists) {
    throw new AppError('User unauthorized', 403)
  }

  const transaction_exist = await findTransactionByIdRepository({
    id,
    user_id,
  })

  if (!transaction_exist) {
    throw new AppError('Transaction not found', 404)
  }

  return transaction_exist
}
