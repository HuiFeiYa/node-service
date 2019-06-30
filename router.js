const Router = require('koa-router')
const router = new Router()
const { encode } = require('./lib/crypto')
const auth = require('./middlewares/auth')
const minRouter = require('./router/minprogram/index')
const vueRouter = require('./router/vue_back')
module.exports = app => {
  minRouter(router)
  vueRouter(router)
  app.use(router.routes())
}
