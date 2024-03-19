import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '../../../services/prisma'
import { AppError } from '../../../shared/error/app-error'
import { type User } from '@prisma/client'
import { userView } from '../../../shared/views/user'

interface ISessionUseCase {
  email: string
  password: string
}

export interface ISessionUseCaseResponse {
  user: Omit<User, 'password' | 'updated_at' | 'deleted_at'>
  token: string
}

export const sessionUseCase = async ({
  email,
  password,
}: ISessionUseCase): Promise<ISessionUseCaseResponse> => {
  const user_exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user_exists) {
    throw new AppError('Email or password wrong', 401)
  }

  const compare_password = await bcrypt.compare(password, user_exists.password)

  if (!compare_password) {
    throw new AppError('Email or password wrong', 401)
  }

  const token = jwt.sign({ sub: user_exists.id }, process.env.SECRET_WORD, {
    expiresIn: '7d',
  })

  const user = userView(user_exists)

  return {
    user,
    token,
  }
}
