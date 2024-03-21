import bcrypt from 'bcrypt'

import { AppError } from '../../../shared/error/app-error'
import { userView } from '../../../shared/views/user'
import { findUserByIdRepository } from '../repositories/find-user-by-id-repository'
import { updateUserRepository } from '../repositories/update-user-repository'
import { type User } from '@prisma/client'

interface IUpdateUserUseCase {
  user_id: string
  name?: string
  password?: string
}

interface IUpdateUserUseCaseResponse {
  user: Omit<User, 'password' | 'updated_at' | 'deleted_at'>
}

export const updateUserUseCase = async ({
  user_id,
  name,
  password,
}: IUpdateUserUseCase): Promise<IUpdateUserUseCaseResponse> => {
  const user_exists = await findUserByIdRepository({ user_id })

  if (!user_exists) {
    throw new AppError('User not found', 401)
  }
  const hashed_password = await bcrypt.hash(password!, 10)
  const user_result = await updateUserRepository({
    user_id,
    name: name ?? user_exists.name,
    password: hashed_password ?? user_exists.password,
  })

  const user = userView(user_result)

  return { user }
}
