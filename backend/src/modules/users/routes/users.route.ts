import { type Context, type Next } from 'koa'

export const userList = async (ctx: Context, response: Next): Promise<void> => {
  const users = 'Gui Silva'
  ctx.body = users
}

export const userCreate = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const users = 'Gui Silva'
  ctx.body = users
}

export const userUpdate = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const users = 'Gui Silva'
  ctx.body = users
}

export const userRemove = async (
  ctx: Context,
  response: Next,
): Promise<void> => {
  const users = 'Gui Silva'
  ctx.body = users
}
