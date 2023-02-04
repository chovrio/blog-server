import Router from 'koa-router'
import { checkFolder } from '../middleware/article.middleware'
import {
  findAllArticles,
  findOneArticle,
  getArticleContent,
  storageArticle,
  deleteArticle,
  findAllArticlesFe,
  getArticleContentFe
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

// 前台
articleRouter.get('/acquire-fe', findAllArticlesFe)
// 获得文章内容接口
articleRouter.get('/content-fe', getArticleContentFe)

export default articleRouter
