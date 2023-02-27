import type { Middleware } from 'koa'

// 处理参数中间件
export const processParame: Middleware = async (ctx, next) => {
  const data = ctx.request.body
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      ctx.request.body = JSON.parse(key)
    }
  }
  await next()
}
