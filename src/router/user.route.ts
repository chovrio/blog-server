import Router from 'koa-router'
import { auth } from '../middleware/user.middleware'
import { getInfoFe, info, login, register } from '../controller/user.controller'
import {
  userValidator,
  verifyUser,
  verifyLogin,
  verifyFile
} from '../validator/user.validator'
const userRouter = new Router({ prefix: '/user' })
// 注册接口
userRouter.post('/register', userValidator, verifyUser, register)
// 登录接口
userRouter.post('/login', userValidator, verifyLogin, login)
// 获得用户信息接口
userRouter.get('/info', auth, info)
// 修改用户头像接口
userRouter.post('/uploadactor', auth, verifyFile)
export default userRouter
// 前台
// 获得用户总体信息接口
userRouter.get('/all-fe', getInfoFe)
