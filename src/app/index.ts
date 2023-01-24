import Koa from 'koa'
import router from '../router'
import koaBody from 'koa-body'
import { HttpMethodEnum } from 'koa-body'
import path from 'path'
import errHandler from './errHandler'
// 导入实则在链接数据库
import '../db'
const app = new Koa()

app
  .use(
    koaBody({
      multipart: true,
      formidable: {
        // 在配置选项option里，不推荐使用相对路径
        // 在option里的相对路径，不是相对的当前路径。相对process.cew()
        // uploadDir: './src/uploads',
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
      },
      parsedMethods: [
        HttpMethodEnum.GET,
        HttpMethodEnum.POST,
        HttpMethodEnum.DELETE,
        HttpMethodEnum.PUT
      ]
    })
  )
  .use(router.routes())
  .use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

export default app
