import { type Context, type Next } from 'koa'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { loginValidation } from './validations/login'
import { prisma } from '../../services/prisma'
import { userView } from '../../shared/views/user'

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

  const compare_password = await bcrypt.compare(password, user.password)

  if (!compare_password) {
    ctx.status = 401
    ctx.body = 'Email or password wrong'
    return
  }

  const token = jwt.sign({ sub: user.id }, process.env.SECRET_WORD, {
    expiresIn: '7d',
  })

  const user_view = userView(user)

  ctx.status = 200
  ctx.body = {
    user: user_view,
    token,
  }
}
