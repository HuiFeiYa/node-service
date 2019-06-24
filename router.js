const Router = require('koa-router')
const router = new Router()
const { encode } = require('./lib/crypto')
const auth = require('./middlewares/auth')
const { vueLogin, vueRegistered } = require('./controller/login')
const jsonMine = 'application/json'
const minRouter = require('./router/minprogram/index')
function handle(ctx, data, code = 0, message = 'success') {
  ctx.type = jsonMine
  ctx.body = {
    code,
    data,
    message
  }
}
module.exports = app => {
  minRouter(router)
  // router.get('/login', async (ctx, next) => {
  //   const { code } = ctx.request.query
  //   const all = await findAll()
  //   const session = await login(code)
  //   if (session) {
  //     const { session_key, openid } = session
  //     // 查找数据是否已经存有openid，进行数据库相关逻辑操作
  //     await findOpenid(ctx, openid)
  //     handle(ctx, { token: encode(openid) })
  //   } else {
  //     throw new Error('登陆失败')
  //   }
  // })
  router.get('/user', auth, async (ctx, next) => {
    const { isExpired, user } = ctx.state

    if (isExpired) {
      handle(ctx, '', 2, '登陆过期')
    } else {
      handle(ctx, ctx.state.user)
    }
  })
  router.get('/vue/login', vueLogin)
  router.get('/vue/register', vueRegistered)
  app.use(router.routes())
}
