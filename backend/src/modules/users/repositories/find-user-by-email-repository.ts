import { type User } from '@prisma/client'
import { prisma } from '../../../services/prisma'

interface IFindUserByEmailRepository {
  email: string
}

export const findUserByEmailRepository = async ({
  email,
}: IFindUserByEmailRepository): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}
