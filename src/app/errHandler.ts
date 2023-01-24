import { error } from '../types'

const errHandler = (err: error, ctx: any) => {
  let status = 500
  if (err.status) {
    status = err.status
  }
  ctx.status = status
  ctx.body = err
}
export default errHandler
