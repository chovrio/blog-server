import Router from 'koa-router'
import articleRouter from './article.route'
import userRouter from './user.route'
import trackerRouter from './tracker.route'

const router = new Router()
router
  .use(userRouter.routes())
  .use(articleRouter.routes())
  .use(trackerRouter.routes())
router.get('/test', ctx => {
  ctx.body = 'test111'
})

export default router
