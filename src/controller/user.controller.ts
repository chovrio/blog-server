import type { Middleware } from 'koa'
import { JWT_SECRET, SERVER_RUNNiNG } from '../config/config.default'
import { createUser, getUserInfo, getUserInfoFe } from '../service/user.service'
import jwt from 'jsonwebtoken'
import {
  getInfoError,
  userLoginError,
  userRegisterError
} from '../constant/err.type'

export const register: Middleware = async ctx => {
  const { name, password } = ctx.request.body
  try {
    const user = await createUser({ name, password })
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
      name: user?.name
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

export const info: Middleware = async ctx => {
  const { name } = ctx.state.user
  const res = await getUserInfo(name)

  ctx.body = {
    code: 200,
    message: '获取信息成功',
    result: {
      name,
      info: res?.info,
      avactor: `${<string>SERVER_RUNNiNG}/avactor/${res?.avactor}`,
      state: res?.state
    }
  }
}

// 前台
export const getInfoFe: Middleware = async ctx => {
  const { name } = ctx.query
  try {
    const res = await getUserInfoFe(name as string)
    ctx.body = {
      code: 200,
      message: '获取信息成功',
      result: res
    }
  } catch (e) {
    ctx.app.emit('error', getInfoError, ctx)
  }
}
