import type { Middleware } from 'koa'
import fs from 'fs'
import path from 'path'
import { createFileError, publishDateError } from '../constant/err.type'
import { createArticle } from '../service/article.service'
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
