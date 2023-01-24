import UserModel from '../model/user.model'

export const getUserInfo = async (name: string) => {
  const res = await UserModel.findOne({ name })
  return res
}
