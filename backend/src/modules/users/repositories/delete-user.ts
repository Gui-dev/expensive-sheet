import { prisma } from '../../../services/prisma'

interface IDeleteUserRepository {
  id: string
}
export const deleteUserRepository = async ({
  id,
}: IDeleteUserRepository): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  })
}
