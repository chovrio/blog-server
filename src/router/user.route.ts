import Router from 'koa-router'
import { login, register } from '../controller/user.controller'
import {
  userValidator,
  verifyUser,
  verifyLogin
} from '../validator/user.validator'
const userRouter = new Router({ prefix: '/user' })
// 注册接口
userRouter.post('/register', userValidator, verifyUser, register)
// 登录接口
userRouter.post('/login', userValidator, verifyLogin, login)
export default userRouter
