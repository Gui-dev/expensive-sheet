import { type Context, type Next } from 'koa'
import jwt from 'jsonwebtoken'

import { AppError } from '../error/app-error'

export const check_authorization = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  try {
    const authorization = ctx.request.headers.authorization

    if (!authorization) {
      throw new AppError('Token not found', 401)
    }
    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer' || !token) {
      throw new AppError('Token format invalid', 401)
    }

    const decoded = jwt.decode(token)
    ctx.request.user_id = decoded?.sub
    await next()
  } catch (error) {
    console.log('ERROR')
    throw error
  }
}
