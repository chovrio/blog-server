import Router from 'koa-router'
import { checkFolder } from '../middleware/article.middleware'
import { storageArticle } from '../controller/article.controller'
import { auth } from '../middleware/user.middleware'

const articleRouter = new Router({ prefix: '/essay' })
articleRouter.post('/publish', auth, checkFolder, storageArticle)
export default articleRouter
