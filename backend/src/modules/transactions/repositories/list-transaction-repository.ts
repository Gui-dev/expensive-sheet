import { type Transaction } from '@prisma/client'
import { prisma } from '../../../services/prisma'

interface IListTransactionRepository {
  user_id: string
}

export const listTransactionRepository = async ({
  user_id,
}: IListTransactionRepository): Promise<Transaction[]> => {
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id,
    },
  })

  return transactions
}
