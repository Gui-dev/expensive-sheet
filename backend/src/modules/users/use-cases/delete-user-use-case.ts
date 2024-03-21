import { AppError } from '../../../shared/error/app-error'
import { deleteUserRepository } from '../repositories/delete-user-repository'
import { findUserByIdRepository } from '../repositories/find-user-by-id-repository'

interface IDeleteUserUseCase {
  user_id: string
}

export const deleteUserUseCase = async ({
  user_id,
}: IDeleteUserUseCase): Promise<void> => {
  const user_exists = await findUserByIdRepository({ user_id })

  if (!user_exists) {
    throw new AppError('User not found', 401)
  }

  await deleteUserRepository({ id: user_exists.id })
}
