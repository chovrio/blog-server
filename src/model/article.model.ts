import mongoose from 'mongoose'
const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  createTime: {
    type: Number,
    require: true
  },
  updateTime: {
    type: Number,
    require: true
  }
})
const ArticleModel = mongoose.model('Article', articleSchema)
export default ArticleModel
