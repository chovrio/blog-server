import Router from 'koa-router'
import userRouter from './user.route'
const router = new Router()
router.use(userRouter.routes())
router.get('/test', ctx => {
  ctx.body = 'test'
})
export default router
