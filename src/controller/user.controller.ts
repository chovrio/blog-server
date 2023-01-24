import type { Middleware } from 'koa'
import { JWT_SECRET } from '../config/config.default'
import { getUserInfo } from '../service/user.service'
import jwt from 'jsonwebtoken'
import { userLoginError, userRegisterError } from '../constant/err.type'
import UserModel from '../model/user.model'

export const register: Middleware = async ctx => {
  const { name, password } = ctx.request.body
  try {
    const user = await UserModel.create({
      name,
      password
    })
    ctx.body = {
      code: 200,
      message: '用户注册成功',
      result: {
        id: user.id,
        name: user.name,
        password: '密码就不透露了'
      }
    }
  } catch (error) {
    console.error('用户注册失败', error)
    ctx.app.emit('error', userRegisterError, ctx)
  }
}

export const login: Middleware = async ctx => {
  const { name } = ctx.request.body
  try {
    // 从返回结果中提出password属性，将剩下的属性放到res对象
    const user = await getUserInfo(name)
    const obj = {
      name: user?.name,
      info: user?.info,
      state: user?.state
    }
    ctx.body = {
      code: 200,
      message: '用户登录成功',
      result: {
        token: jwt.sign(obj, <string>JWT_SECRET, { expiresIn: '30d' })
      }
    }
  } catch (err) {
    console.error('用户登录失败', err)
    ctx.app.emit('error', userLoginError, ctx)
  }
}
