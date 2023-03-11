import ArticleModel from '../model/article.model'
import { getUserInfo } from './user.service'
interface IArticle {
  name: string
  author: string
  tags: string[]
  createTime: number
  updateTime: number
}
// 创建文章
export const createArticle = async (obj: IArticle) => {
  const res = await ArticleModel.create({
    name: obj.name,
    author: obj.author,
    tags: obj.tags,
    createTime: obj.createTime,
    updateTime: obj.updateTime
  })
  return res
}

// 获得所有文章
export const getAllArticle = async (author: string, flag = false) => {
  if (flag === true) {
    const info = await getUserInfo(author)
    if (info?.state === 0) {
      const res = await ArticleModel.find()
      return res
    }
  }
  const res = await ArticleModel.find({ author })
  return res
}
// 获得指定文章
export const getArticle = async (id: string) => {
  const res = await ArticleModel.find()
  const article = res.filter(item => item.id === id)
  return article
}
// 删除指定文章
export const deleteArticle = async (id: string) => {
  const data = await getArticle(id)
  const article = data[0]
  const res = await ArticleModel.deleteOne({
    name: article.name,
    author: article.author,
    createTime: article.createTime,
    updateTime: article.updateTime
  })
  return res
}
