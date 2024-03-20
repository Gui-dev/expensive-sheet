import { type Transaction } from '@prisma/client'
import { prisma } from '../../../services/prisma'

interface IFindTransactionByIdRepository {
  id: string
  user_id: string
}

export const findTransactionByIdRepository = async ({
  id,
  user_id,
}: IFindTransactionByIdRepository): Promise<Transaction | null> => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
      user_id,
    },
  })

  return transaction
}
