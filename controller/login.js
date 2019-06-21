const {
  findUserByName,
  findUserById,
  createUser
} = require('../lib/db/word/index')
// 统一处理返回数据
const jsonMine = 'application/json'
function handle(ctx, data, code = 0, message = 'success') {
  ctx.type = jsonMine
  ctx.body = {
    code,
    data,
    message
  }
}
async function vueLogin(ctx) {
  const { username, password } = ctx.request.query

  const allList = await findUserByName(username)

  if (allList.length === 0) {
    handle(ctx, '', 1, '该用户未注册')
  } else {
    if (allList[0].password !== password) {
      handle(ctx, '', 1, '密码错误')
    } else {
      handle(ctx, '', 0, '登陆成功')
    }
  }
}
async function vueRegistered(ctx) {
  const { username, password } = ctx.request.query
  const allList = await findUserByName(username)
  if (allList.length === 0) {
    const time = new Date().getTime()
    const idStr = String(time).slice(7)
    createUser({ username, password, id: idStr, updateTime: idStr })
    handle(ctx, null, 0, '恭喜你，已经注册成功啦')
  } else {
    handle(ctx, null, 1, '用户名已经注册')
  }
}
module.exports = {
  vueLogin,
  vueRegistered
}
