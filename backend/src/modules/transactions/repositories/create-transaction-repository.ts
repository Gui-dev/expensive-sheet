import { type Transaction } from '@prisma/client'

import { prisma } from '../../../services/prisma'

interface ICreateTransactionRepository {
  user_id: string
  description: string
  value: number
}

export const createTransactionRepository = async ({
  user_id,
  description,
  value,
}: ICreateTransactionRepository): Promise<Transaction> => {
  const transaction = await prisma.transaction.create({
    data: {
      user_id,
      description,
      value,
    },
  })

  return transaction
}
