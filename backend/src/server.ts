import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { router } from './routes'
import { AppError } from './shared/error/app-error'
import { ZodError } from 'zod'

const app = new Koa()
const PORT = process.env.SERVER_PORT ?? process.env.PORT
app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof AppError) {
      ctx.status = err.statusCode
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
      return
    }

    if (err instanceof ZodError) {
      ctx.status = 400
      ctx.body = err.errors[0].message
      ctx.app.emit('error', err, ctx)
      return
    }

    ctx.status = 500
    ctx.body = err
    ctx.app.emit('error', err, ctx)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
})
