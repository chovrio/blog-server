import type { Middleware } from 'koa'
import fs from 'fs'
import path from 'path'
import { createFolderError } from '../constant/err.type'
export const checkFolder: Middleware = async (ctx, next) => {
  const { name } = ctx.state.user
  const arr = fs.readdirSync(path.resolve(__dirname, '../upload/articles'))
  const flag = arr.find(item => item == name)
  if (!flag) {
    try {
      fs.mkdirSync(path.resolve(__dirname, `../upload/articles/${name}`))
    } catch (err) {
      return ctx.app.emit('error', createFolderError, ctx)
    }
  }
  await next()
}
