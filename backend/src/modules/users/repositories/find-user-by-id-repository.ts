import { type User } from '@prisma/client'
import { prisma } from '../../../services/prisma'

interface IFindUserByIdRepository {
  user_id: string
}

export const findUserByIdRepository = async ({
  user_id,
}: IFindUserByIdRepository): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  return user
}
