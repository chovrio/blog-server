import type { Middleware } from 'koa'
import path from 'path'
import bcryptjs from 'bcrypt'
import {
  userAlreadyExited,
  userFormateError,
  userNotExited,
  invalidPassword,
  unSupportedFileType,
  fileUploadError,
  InsufficientUserRights
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
  const { file }: any = ctx.request.files
  const fileTypes = ['image/jpeg', 'image/png']
  if (file) {
    if (fileTypes.includes(file.mitetype))
      return ctx.app.emit('error', unSupportedFileType, ctx)
    ctx.body = {
      code: 0,
      message: '用户头像上传成功',
      result: {
        goods_img: path.basename(file.filepath)
      }
    }
  } else {
    return ctx.app.emit('error', fileUploadError, ctx)
  }
  next()
}

export const verifyIdenty: Middleware = async (ctx, next) => {
  const name = ctx.state.user.name
  const res = await getUserInfo(name)
  if (res?.state === 0) {
    await next()
  } else ctx.app.emit('error', InsufficientUserRights, ctx)
}
