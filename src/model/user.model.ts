// 引入mongoose
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
// 对密码进行加盐处理
// 配置加盐的位数
const SALT_WORK_FACTOR = 10
// 2.定义Schema(描述文档结构)
const userSchema = new mongoose.Schema({
  //⻆⾊名称
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    // 调用了set⽅法，当我们写⼊数据时，bcrypt模块会将存⼊的密码进行哈希密码的加密
    set(val: string) {
      // 加密生成
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
      // 生成hash密码
      const psw = bcrypt.hashSync(val, salt)
      return psw
    }
  },
  // 用户信息
  info: {
    type: String,
    require: false,
    default: '这个用户很懒，什么也没留下'
  },
  // 用户等级，默认为10，游客
  state: {
    type: Number,
    require: false,
    default: 10
  }
})
// 3.定义Model(与集合对应,可以操作集合)
const UserModel = mongoose.model('User', userSchema)

// 4.向外暴露
export default UserModel
