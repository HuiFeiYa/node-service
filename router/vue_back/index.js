const { vueLogin, vueRegistered, checkStatus } = require('./controller')
module.exports = router => {
  router.post('/vue/login', vueLogin)
  router.post('/vue/register', vueRegistered)
  router.post('/vue/check', checkStatus)
}
