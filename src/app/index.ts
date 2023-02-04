import Koa from 'koa'
import router from '../router'
import koaBody from 'koa-body'
import { HttpMethodEnum } from 'koa-body'
import KoaStatic from 'koa-static'
import path from 'path'
import errHandler from './errHandler'
import cors from 'koa2-cors'
// 导入实则在链接数据库
import '../db'
const app = new Koa()

app.use(
  cors({
    origin: function (ctx) {
      const whiteList = [
        'https://blog-be.chovrio.club',
        'https://blog-fe.chovrio.club'
      ] //可跨域白名单
      let url = ''
      if (ctx.header.referer)
        url = ctx.header.referer.substr(0, ctx.header.referer.length - 1)
      if (whiteList.includes(url)) {
        return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
      }
      return 'http://localhost::5173' //默认允许本地请求3000端口可跨域
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)
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
  .use(KoaStatic(path.resolve(__dirname, '../upload')))
  .use(router.routes())
  .use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

export default app
