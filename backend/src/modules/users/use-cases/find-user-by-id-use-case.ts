import { type User } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { userView } from '../../../shared/views/user'
import { findUserByIdRepository } from '../repositories/find-user-by-id-repository'

interface IFindUserById {
  user_id: string
}

export const findUserByIdUseCase = async ({
  user_id,
}: IFindUserById): Promise<
  Omit<User, 'password' | 'updated_at' | 'deleted_at'>
> => {
  const user_exists = await findUserByIdRepository({ user_id })

  if (!user_exists) {
    throw new AppError('User not found', 404)
  }

  const user_view = userView(user_exists)

  return user_view
}
