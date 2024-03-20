import { prisma } from '../../../services/prisma'

interface IDeleteTransactionRepository {
  id: string
  user_id: string
}

export const deleteTransactionRepository = async ({
  id,
  user_id,
}: IDeleteTransactionRepository): Promise<void> => {
  await prisma.transaction.delete({
    where: {
      id,
      user_id,
    },
  })
}
