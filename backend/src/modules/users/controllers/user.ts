import { type Context, type Next } from 'koa'

import { userCreateValidation } from './../validations/user-create-validation'
import {
  updateUserIdValidation,
  userUpdateValidation,
} from './../validations/user-update-validation'
import { findUserByIdUseCase } from '../use-cases/find-user-by-id-use-case'
import { createUserUseCase } from '../use-cases/create-user-use-case'
import { updateUserUseCase } from '../use-cases/update-user-use-case'
import { deleteUserUseCase } from '../use-cases/delete-user-use-case'
import { deleteUserIdValidation } from '../validations/user-delete-validation'

export const userById = async (ctx: Context, response: Next): Promise<void> => {
  const user_id = updateUserIdValidation.parse(ctx.request.user_id)
  const user = await findUserByIdUseCase({ user_id })

  ctx.status = 200
  ctx.body = user
}

export const userCreate = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const { name, email, password } = userCreateValidation.parse(ctx.request.body)

  const { user } = await createUserUseCase({ name, email, password })

  ctx.status = 201
  ctx.body = user
}

export const userUpdate = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const user_id = updateUserIdValidation.parse(ctx.request.user_id)
  const { name, password } = userUpdateValidation.parse(ctx.request.body)

  const { user } = await updateUserUseCase({ user_id, name, password })

  ctx.status = 200
  ctx.body = user
}

export const userRemove = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const user_id = deleteUserIdValidation.parse(ctx.request.user_id)

  await deleteUserUseCase({ user_id })

  ctx.status = 204
}
