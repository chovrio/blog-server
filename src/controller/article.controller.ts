import type { Middleware } from 'koa'
import fs from 'fs'
import path from 'path'
import {
  createFileError,
  IdNotExist,
  publishDateError,
  RequestError
} from '../constant/err.type'
import {
  createArticle,
  getAllArticle,
  getArticle
} from '../service/article.service'
export const storageArticle: Middleware = async ctx => {
  const { name } = ctx.state.user
  const { title, content } = ctx.request.body
  try {
    const res = await createArticle({
      name: title,
      author: name,
      createTime: new Date().getTime(),
      updateTime: new Date().getTime()
    })
    try {
      fs.writeFileSync(
        path.resolve(
          __dirname,
          `../upload/articles/${name}/${title}-${res.id}.md`
        ),
        content
      )
      ctx.body = {
        code: 200,
        message: '文章发布成功',
        result: {
          author: name,
          title
        }
      }
    } catch (error) {
      ctx.app.emit('error', createFileError, ctx)
    }
  } catch (error) {
    ctx.app.emit('error', publishDateError, ctx)
  }
}
export const findAllArticles: Middleware = async ctx => {
  const { name } = ctx.state.user
  try {
    const res = await getAllArticle(name)
    ctx.body = {
      code: 200,
      message: '获得文章成功',
      result: res
    }
  } catch (error) {
    console.error('获得文章失败', error)
    ctx.app.emit('error', RequestError, ctx)
  }
}
export const findOneArticle: Middleware = async ctx => {
  const { id } = ctx.params
  try {
    const res = await getArticle(id)
    if (res.length === 0) {
      return ctx.app.emit('error', IdNotExist, ctx)
    }
    ctx.body = {
      code: 200,
      message: '获得文章成功',
      result: res[0]
    }
  } catch (error) {
    console.error('获得文章失败', error)
    ctx.app.emit('error', RequestError, ctx)
  }
}
export const getArticleContent: Middleware = async ctx => {
  const { id } = ctx.params
  const { name } = ctx.state.user
  try {
    const res = await getArticle(id)
    if (res.length === 0) {
      return ctx.app.emit('error', IdNotExist, ctx)
    }
    const articleName = res[0].name + '-' + res[0].id
    const article = fs.readFileSync(
      path.resolve(__dirname, `../upload/articles/${name}/${articleName}.md`),
      {
        encoding: 'utf-8'
      }
    )
    ctx.body = {
      code: 200,
      message: '获得文章内容成功',
      result: {
        info: res[0],
        content: article
      }
    }
  } catch (error) {
    console.error('获得内容失败', error)
    ctx.app.emit('error', RequestError, ctx)
  }
}
