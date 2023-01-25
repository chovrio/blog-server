import UserModel from '../model/user.model'

export const getUserInfo = async (name: string) => {
  const res = await UserModel.findOne({ name })
  return res
}
interface IUser {
  name: string
  password: string
}
export const createUser = async ({ name, password }: IUser) => {
  const res = await UserModel.create({
    name,
    password
  })
  return res
}
