import { updateTracker } from '../controller/tracker.controller'
import Router from 'koa-router'
import { processParame } from '../middleware/tracker.middleware'

const trackerRouter = new Router({
  prefix: '/tracker'
})

// 文章阅读量上报接口
trackerRouter.post('/atcpv', processParame, updateTracker)
trackerRouter.get('/', ctx => {
  ctx.body = 'test'
})
export default trackerRouter
