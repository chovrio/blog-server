import { error } from '../types'

const errHandler = (err: error, ctx: any) => {
  let status = 500
  if (err.code) {
    status = err.code
  }
  ctx.status = status
  ctx.body = err
}
export default errHandler
