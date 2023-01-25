import type { Middleware } from 'koa'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.default'
import { invalidToken, tokenExpiredError } from '../constant/err.type'
export const auth: Middleware = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    // user中包含了payload的信息(id,user_name,is_admin)
    const user = jwt.verify(token, <string>JWT_SECRET)
    ctx.state.user = user
    await next()
  } catch (err: any) {
    console.error(err)
    switch (err.name) {
      case 'TokenExpiredError':
        console.log('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.log('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
      default:
        break
    }
  }
}
