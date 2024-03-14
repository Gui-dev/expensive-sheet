import { type Context, type Next } from 'koa'

import { prisma } from './../../../services/prisma'
import { userCreateValidation } from './../validations/user-create'
import {
  userUpdateIdParamValidation,
  userUpdateValidation,
} from './../validations/user-update'
import { userDeleteIdParamValidation } from './../validations/user-delete'
import { userView } from './../../../shared/views/user'
import { AppError } from './../../../shared/error/app-error'
import { findUserById } from '../use-cases/find-user-by-id'
import { createUserRepository } from './../repositories/create-user'
import { deleteUserRepository } from './../repositories/delete-user'

export const userById = async (ctx: Context, response: Next): Promise<void> => {
  const { user_id } = userUpdateIdParamValidation.parse(ctx.request.params)
  const user = await findUserById({ user_id })

  ctx.status = 200
  ctx.body = user
}

export const userList = async (ctx: Context, response: Next): Promise<void> => {
  const users = await prisma.user.findMany()

  if (!users) {
    ctx.status = 404
    ctx.body = 'users not found, try again'
    return
  }

  const users_view = users.map((user) => userView(user))

  ctx.status = 200
  ctx.body = users_view
}

export const userCreate = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const { name, email, password } = userCreateValidation.parse(ctx.request.body)

  const user_already_exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user_already_exists) {
    throw new AppError('User already exists', 409)
  }
  const user = await createUserRepository({ name, email, password })
  const user_view = userView(user)

  ctx.status = 201
  ctx.body = user_view
}

export const userUpdate = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const { user_id } = userUpdateIdParamValidation.parse(ctx.request.params)
  const { name, password } = userUpdateValidation.parse(ctx.request.body)

  const user_exists = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user_exists) {
    throw new AppError('User not found', 401)
  }

  const user = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: name ?? user_exists.name,
      password: password ?? user_exists.password,
    },
  })

  const user_view = userView(user)

  ctx.status = 200
  ctx.body = user_view
}

export const userRemove = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const { user_id } = userDeleteIdParamValidation.parse(ctx.request.params)

  const user_exists = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user_exists) {
    throw new AppError('User not found', 401)
  }

  await deleteUserRepository({ id: user_exists.id })

  ctx.status = 204
}
