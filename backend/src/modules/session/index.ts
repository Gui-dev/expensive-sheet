import { type Context, type Next } from 'koa'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { loginValidation } from './validations/login'
import { prisma } from '../../services/prisma'
import { userView } from '../../shared/views/user'
import { AppError } from '../../shared/error/app-error'

interface GetCredentialsByAuthHeaderResponse {
  email_credential: string
  password_credential: string
}

export const getCredentialsByAuthHeader = async (
  authHeader: string | undefined,
): Promise<GetCredentialsByAuthHeaderResponse> => {
  if (!authHeader) {
    throw new AppError('Hashed invalid')
  }

  const [, credentials] = authHeader.split(' ')
  const credential_result = Buffer.from(credentials, 'base64').toString('ascii')
  const [email_credential, password_credential] = credential_result.split(':')
  return {
    email_credential,
    password_credential,
  }
}

export const login = async (ctx: Context, next: Next): Promise<void> => {
  const { email_credential, password_credential } =
    await getCredentialsByAuthHeader(ctx.request.headers.authorization)

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
