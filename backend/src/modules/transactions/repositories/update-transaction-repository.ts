import { type Transaction } from '@prisma/client'
import { prisma } from '../../../services/prisma'

interface IUpdateTransactionRepository {
  id: string
  user_id: string
  description?: string
  value?: number
}

export const updateTransactionRepository = async ({
  id,
  user_id,
  description,
  value,
}: IUpdateTransactionRepository): Promise<Transaction> => {
  const transaction = await prisma.transaction.update({
    where: {
      id,
      user_id,
    },
    data: {
      description,
      value,
    },
  })

  return transaction
}
