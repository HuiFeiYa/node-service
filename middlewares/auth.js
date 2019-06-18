const { getOpenid } = require('../lib/db/user')
const { decode } = require('../lib/crypto')

// 统一获取token值
module.exports = async function(ctx, next) {
  const sessionKey = ctx.get('x-session')
  const { id, timespan } = decode(sessionKey)
  // 查找数据库中是否存在该 openid，返回是一个数组，如果不存在则返回[]
  const targetList = await getOpenid(id)
  if (targetList.length > 0) {
    // 如果超过设定的过期时间，标记isExpired字段为登陆过期
    const oneHour = 1000 * 60
    if (Date.now() - timespan > oneHour) {
      ctx.state.isExpired = true
    } else {
      const { name, id, avatar, userType } = targetList[0]
      // 将从数据库中获取的数据存放在 ctx.state对象下，供所以中间件使用
      ctx.state.user = {
        name,
        id,
        avatar,
        userType
      }
    }
  } else {
    // 通过ctx.throw可以直接抛出错误
    ctx.throw(401, '登陆失败')
  }
  await next()
}
