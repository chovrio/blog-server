import type { Middleware } from 'koa'
import bcryptjs from 'bcrypt'
import {
  userAlreadyExited,
  userFormateError,
  userNotExited,
  invalidPassword
} from '../constant/err.type'
import { getUserInfo } from '../service/user.service'

export const userValidator: Middleware = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 合法性
  if (!name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    return ctx.app.emit('error', userFormateError, ctx)
  }
  await next()
}
export const verifyUser: Middleware = async (ctx, next) => {
  const { name } = ctx.request.body
  // 合理性
  const res = await getUserInfo(name)
  if (res) {
    console.error('用户名已经存在', name)
    return ctx.app.emit('error', userAlreadyExited, ctx)
  }
  await next()
}
export const verifyLogin: Middleware = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 合理性
  const res = await getUserInfo(name)
  if (!res) {
    console.error('用户名不存在', name)
    return ctx.app.emit('error', userNotExited, ctx)
  }
  if (!bcryptjs.compareSync(password, <string>res.password)) {
    return ctx.app.emit('error', invalidPassword, ctx)
  }
  await next()
}

export const verifyFile: Middleware = async (ctx, next) => {
  const { file } = ctx.request.body
  console.log(file)
  next()
}
