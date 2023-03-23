import ArticleModel from '../model/article.model'
import UserModel from '../model/user.model'

// 获得用户信息
export const getUserInfo = async (name: string) => {
  const res = await UserModel.findOne({ name })
  return res
}
interface IUser {
  name: string
  password: string
}
// 创建用户
export const createUser = async ({ name, password }: IUser) => {
  const res = await UserModel.create({
    name,
    password
  })
  return res
}

// 获得所有用户
export const users = async () => {
  const res = await UserModel.find().select([
    'name',
    'state',
    'info',
    'avactor'
  ])
  return res
}

// 获得一些用户信息
export const getUserInfoFe = async (name: string) => {
  const user = await UserModel.findOne({ name })
  const result: {
    articleNum?: number
  } = {}
  if (user) {
    const res = await ArticleModel.find({ author: name })
    result['articleNum'] = res.length
  }
  return result
}

// 删除用户
export const delUser = async (name: string) => {
  const res = await UserModel.deleteOne({ name })
  return res
}
