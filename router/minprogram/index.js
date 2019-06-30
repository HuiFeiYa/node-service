const { login } = require('./controller')
const auth = require('../../middlewares/auth')
module.exports = router => {
  // 登陆页面不需要使用 auth 中间件校验权限
  router.post('/login', login)
  router.post('/user', auth)
}
