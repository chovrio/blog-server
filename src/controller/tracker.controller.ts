import type { Middleware } from 'koa'
import { createTrack, findTrackDate } from '../service/tracker.service'
import { RequestError } from '../constant/err.type'
export const updateTracker: Middleware = async ctx => {
  const { uuid, id } = ctx.request.body
  console.log(uuid, id)
  try {
    const res = await findTrackDate(uuid, id)
    if (res) {
      await res.updateOne({
        pv: res.pv + 1
      })
    } else {
      await createTrack(uuid, id)
    }
  } catch (err) {
    ctx.app.emit('error', RequestError)
    console.error('查找过程失败', err)
  }
  ctx.body = '上报成功'
}
