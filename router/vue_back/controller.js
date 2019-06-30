const {
  findUserByName,
  findUserById,
  createUser,
  findByKey
} = require('../../lib/db/vue_back/word/index')
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
  const { username, password } = ctx.request.body

  const allList = await findUserByName(username)
  const userid = allList[0] && allList[0].userid
  if (allList.length === 0) {
    handle(ctx, '', 1, '该用户未注册')
  } else {
    if (allList[0].password !== password) {
      handle(ctx, '', 1, '密码错误')
    } else {
      handle(ctx, { userid }, 0, '登陆成功')
    }
  }
}
async function vueRegistered(ctx) {
  const { username, password } = ctx.request.body
  const allList = await findUserByName(username)
  console.log(new Date().getTime())

  if (allList.length === 0) {
    const time = new Date().getTime()
    createUser({
      username,
      password,
      updateTime: new Date().getTime(),
      userid: Math.round(Math.random() * 100000)
    })
    handle(ctx, null, 0, '恭喜你，已经注册成功啦')
  } else {
    handle(ctx, null, 1, '用户名已经注册')
  }
}
async function checkStatus(ctx) {
  const { userid } = ctx.request.body
  // id不存在则停止
  if (!userid) {
    handle(ctx, null, 1, '没有该用户')
    return
  }
  const allList = await findByKey('userid', userid)
  const { updateTime, username } = allList[0]

  if (allList.length === 0) {
    handle(ctx, null, 1, '用户未登陆')
  } else {
    if (isExpired(ctx, updateTime)) {
      handle(ctx, null, 1, '登陆过期')
    } else {
      handle(ctx, { username }, 0, '登陆成功啦')
    }
  }
}
function isExpired(ctx, lastTime) {
  const one = 1000 * 60 * 60 * 24
  return new Date().getTime() - lastTime > one
}
module.exports = {
  vueLogin,
  vueRegistered,
  checkStatus
}
