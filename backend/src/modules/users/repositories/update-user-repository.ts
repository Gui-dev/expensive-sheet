import { type User } from '@prisma/client'
import { prisma } from '../../../services/prisma'

interface IUpdateUserRepository {
  user_id: string
  name: string
  password: string
}

export const updateUserRepository = async ({
  user_id,
  name,
  password,
}: IUpdateUserRepository): Promise<User> => {
  const user = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name,
      password,
    },
  })

  return user
}
