const Router = require('koa-router')
const router = new Router()
const jsonMine = 'application/json'
const { findAll } = require('./lib/db/user')
const { findAllWord } = require('./lib/db/word/index')
const { login } = require('./actions/account')
const { findOpenid } = require('./controller/home')
const { encode } = require('./lib/crypto')
const auth = require('./middlewares/auth')
// 统一处理返回数据
function handle(ctx, data, code = 0, message = 'success') {
  ctx.type = jsonMine
  ctx.body = {
    code,
    data,
    message
  }
}
module.exports = app => {
  router.get('/login', async (ctx, next) => {
    const { code } = ctx.request.query
    const all = await findAll()
    const session = await login(code)
    if (session) {
      const { session_key, openid } = session
      // 查找数据是否已经存有openid，进行数据库相关逻辑操作
      await findOpenid(ctx, openid)
      handle(ctx, { token: encode(openid) })
    } else {
      throw new Error('登陆失败')
    }
  })
  router.get('/user', auth, async (ctx, next) => {
    const { isExpired, user } = ctx.state

    if (isExpired) {
      handle(ctx, '', 2, '登陆过期')
    } else {
      handle(ctx, ctx.state.user)
    }
  })
  router.get('/word', auth, async ctx => {
    const all = await findAllWord()
    handle(ctx, all)
  })
  app.use(router.routes())
}
