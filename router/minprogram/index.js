const { login } = require('./controller')
module.exports = router => {
  router.post('/login', login)
}
