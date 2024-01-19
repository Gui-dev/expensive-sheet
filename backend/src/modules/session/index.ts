import { type Context, type Next } from 'koa'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { loginValidation } from './validations/login'
import { prisma } from '../../services/prisma'
import { userView } from '../../shared/views/user'
import { AppError } from '../../shared/error/app-error'
import { decodeBasicToken } from './services/decode-basic-token'

export const login = async (ctx: Context, next: Next): Promise<void> => {
  const { email_credential, password_credential } = await decodeBasicToken(
    ctx.request.headers.authorization!,
  )

  const { email, password } = loginValidation.parse({
    email: email_credential,
    password: password_credential,
  })

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

  const user_view = userView(user)

  ctx.status = 200
  ctx.body = {
    user: user_view,
    token,
  }
}
