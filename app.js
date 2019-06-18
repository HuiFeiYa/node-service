const Koa = require('koa')
const app = new Koa()
const router = require('./router')
router(app)
app.listen(8082, () => {
  console.log('8082')
})
