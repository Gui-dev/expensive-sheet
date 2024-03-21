import { type User } from '@prisma/client'
import { prisma } from '../../../services/prisma'
import bcrypt from 'bcrypt'

interface ICreateUser {
  name: string
  email: string
  password: string
}

export const createUserRepository = async ({
  name,
  email,
  password,
}: ICreateUser): Promise<User> => {
  const hashed_password = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed_password,
    },
  })

  return user
}
