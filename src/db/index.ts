import mongoose from 'mongoose'
import { MONGO_DB, MONGO_HOST, MONGO_PORT } from '../config/config.default'
const db_url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
mongoose.set('strictQuery', true)
mongoose.connect(db_url, {
  autoIndex: false
})
// mongoose.createConnection(db_url).asPromise()
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  console.log('链接数据库成功')
})
