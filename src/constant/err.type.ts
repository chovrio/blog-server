export const userFormateError = {
  status: 400,
  message: '用户名或密码为空',
  result: '前端搞鉴权啊!!!(欧，我就是前端)'
}
export const userAlreadyExited = {
  status: 400,
  message: '该用户名已经存在',
  result: ''
}
export const userRegisterError = {
  code: 500,
  message: '用户注册失败',
  result: '应该是服务器内部错误,长时间错误请联系管理员，谢谢🙏'
}
export const userNotExited = {
  code: 400,
  message: '用户名不存在',
  result: ''
}
export const invalidPassword = {
  code: 400,
  message: '密码错误',
  result: ''
}
export const userLoginError = {
  code: 500,
  message: '用户登录失败',
  result: '应该是服务器内部错误,长时间错误请联系管理员，谢谢🙏'
}

export const tokenExpiredError = {
  code: 403,
  message: 'token已过期',
  result: ''
}
export const invalidToken = {
  code: 403,
  message: '无效的token',
  result: ''
}

export const createFolderError = {
  code: 500,
  message: '创建文件夹失败，长时间错误请联系管理员，谢谢🙏',
  result: ''
}

export const createFileError = {
  code: 500,
  message: '创建文件失败，长时间错误请联系管理员，谢谢🙏',
  result: ''
}
export const publishDateError = {
  code: 500,
  message: '上传数据失败，长时间错误请联系管理员，谢谢🙏',
  result: ''
}

export const RequestError = {
  code: 500,
  message: '请求失败，长时间错误请联系管理员，谢谢🙏',
  result: ''
}

export const IdNotExist = {
  code: 400,
  message: '不存在该id的文章',
  result: ''
}
