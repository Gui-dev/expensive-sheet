import { type Context, type Next } from 'koa'
import bcrypt from 'bcrypt'

import { prisma } from './../../services/prisma'
import { userCreateValidation } from './validations/user-create'
import {
  userUpdateIdParamValidation,
  userUpdateValidation,
} from './validations/user-update'
import { userDeleteIdParamValidation } from './validations/user-delete'
import { userView } from '../../shared/views/user'

export const userList = async (ctx: Context, response: Next): Promise<void> => {
  const users = await prisma.user.findMany()

  if (!users) {
    ctx.status = 404
    ctx.body = 'users not found, try again'
    return
  }
  ctx.status = 200
  ctx.body = users
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
    ctx.status = 409
    ctx.body = 'user already exists'
    return
  }
  const hashed_password = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed_password,
    },
  })
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
    ctx.status = 401
    ctx.body = 'user not found'
    return
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

  ctx.status = 200
  ctx.body = user
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
    ctx.status = 401
    ctx.body = 'user not found'
    return
  }

  await prisma.user.delete({
    where: {
      id: user_exists.id,
    },
  })

  ctx.status = 204
}
