import ArticleModel from '../model/article.model'
import { getUserInfo } from './user.service'
interface IArticle {
  name: string
  author: string
  createTime: number
  updateTime: number
}
export const createArticle = async (obj: IArticle) => {
  const res = await ArticleModel.create({
    name: obj.name,
    author: obj.author,
    createTime: obj.createTime,
    updateTime: obj.updateTime
  })
  return res
}

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
export const getArticle = async (id: string) => {
  const res = await ArticleModel.find()
  const article = res.filter(item => item.id === id)
  return article
}
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
