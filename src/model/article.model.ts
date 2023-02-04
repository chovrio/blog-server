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
  tags: {
    type: Array,
    require: false,
    default: ['无']
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
