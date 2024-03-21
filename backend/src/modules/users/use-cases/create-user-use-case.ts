import { type User } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { userView } from '../../../shared/views/user'
import { createUserRepository } from '../repositories/create-user-repository'
import { findUserByEmailRepository } from '../repositories/find-user-by-email'

interface ICreateUserUseCase {
  name: string
  email: string
  password: string
}

interface ICreateUserUseCaseResponse {
  user: Omit<User, 'password' | 'updated_at' | 'deleted_at'>
}

export const createUserUseCase = async ({
  name,
  email,
  password,
}: ICreateUserUseCase): Promise<ICreateUserUseCaseResponse> => {
  const user_already_exists = await findUserByEmailRepository({ email })

  if (user_already_exists) {
    throw new AppError('User already exists', 409)
  }
  const user_result = await createUserRepository({ name, email, password })
  const user = userView(user_result)

  return { user }
}
