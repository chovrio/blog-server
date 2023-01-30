import Router from 'koa-router'
import { checkFolder } from '../middleware/article.middleware'
import {
  findAllArticles,
  findOneArticle,
  getArticleContent,
  storageArticle,
  deleteArticle
} from '../controller/article.controller'
import { auth } from '../middleware/user.middleware'

const articleRouter = new Router({ prefix: '/essay' })
// 上传文章接口
articleRouter.post('/publish', auth, checkFolder, storageArticle)
// 获得文章列表接口
articleRouter.get('/acquire', auth, findAllArticles)
// 获得文章接口
articleRouter.get('/acquire/:id', auth, findOneArticle)
// 获得文章内容接口
articleRouter.get('/content/:id', auth, getArticleContent)
// 删除文章接口
articleRouter.delete('/delete/:id', auth, deleteArticle)
export default articleRouter
