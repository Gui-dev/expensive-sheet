import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '../../../services/prisma'
import { AppError } from '../../../shared/error/app-error'
import { type User } from '@prisma/client'

interface ISessionUseCase {
  email: string
  password: string
}

interface ISessionUseCaseResponse {
  user: User
  token: string
}

export const sessionUseCase = async ({
  email,
  password,
}: ISessionUseCase): Promise<ISessionUseCaseResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new AppError('Email or password wrong', 401)
  }

  const compare_password = await bcrypt.compare(password, user.password)

  if (!compare_password) {
    throw new AppError('Email or password wrong', 401)
  }

  const token = jwt.sign({ sub: user.id }, process.env.SECRET_WORD, {
    expiresIn: '7d',
  })

  return {
    user,
    token,
  }
}
