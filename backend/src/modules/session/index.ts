import { type Context, type Next } from 'koa'
import jwt from 'jsonwebtoken'

import { loginValidation } from './validations/login'
import { prisma } from '../../services/prisma'

export const login = async (ctx: Context, next: Next): Promise<void> => {
  const { email, password } = loginValidation.parse(ctx.request.body)
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    ctx.status = 401
    ctx.body = 'Email or password wrong'
    return
  }

  if (user.password !== password) {
    ctx.status = 401
    ctx.body = 'Email or password wrong'
    return
  }

  if (user.password === password) {
    const token = jwt.sign({ sub: user.id }, process.env.SECRET_WORD, {
      expiresIn: '7d',
    })

    ctx.status = 200
    ctx.body = {
      user,
      token,
    }
  }
}
