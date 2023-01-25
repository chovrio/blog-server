import ArticleModel from '../model/article.model'
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
