// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Koa from 'koa'

declare module 'koa' {
  interface Request {
    user_id?: string | (() => string) | undefined
    body?: any
    rawBody: string
    params?: string
  }
}
