import { type Context, type Next } from 'koa'

import { loginValidation } from './../validations/login'
import { userView } from './../../../shared/views/user'
import { decodeBasicToken } from './../services/decode-basic-token'
import { sessionUseCase } from './../use-cases/session-use-case'

export const login = async (ctx: Context, next: Next): Promise<void> => {
  const { email_credential, password_credential } = await decodeBasicToken(
    ctx.request.headers.authorization!,
  )

  const { email, password } = loginValidation.parse({
    email: email_credential,
    password: password_credential,
  })

  const { user, token } = await sessionUseCase({ email, password })
  const user_view = userView(user)

  ctx.status = 200
  ctx.body = {
    user: user_view,
    token,
  }
}
