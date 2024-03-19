import { type Transaction } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { listTransactionRepository } from '../repositories/list-transaction-repository'
import { findUserByIdRepository } from '../../users/repositories/find-user-by-id'

interface IListTransactionUsecase {
  user_id: string
}

export const listTransactionUsecase = async ({
  user_id,
}: IListTransactionUsecase): Promise<Transaction[]> => {
  const userExists = await findUserByIdRepository({ user_id })

  if (!userExists) {
    throw new AppError('User unauthorized', 403)
  }

  const transactions = await listTransactionRepository({ user_id })

  return transactions
}
