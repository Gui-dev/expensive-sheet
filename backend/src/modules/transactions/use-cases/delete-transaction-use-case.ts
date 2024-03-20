import { AppError } from '../../../shared/error/app-error'
import { findUserByIdRepository } from '../../users/repositories/find-user-by-id'
import { deleteTransactionRepository } from '../repositories/delete-transaction-repository'
import { findTransactionByIdRepository } from '../repositories/find-transaction-by-id-repository'

interface IDeleteTransactionUseCase {
  id: string
  user_id: string
}

export const deleteTransactionUseCase = async ({
  id,
  user_id,
}: IDeleteTransactionUseCase): Promise<void> => {
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

  await deleteTransactionRepository({ id, user_id })
}
