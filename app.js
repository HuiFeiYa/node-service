const Koa = require('koa')
const app = new Koa()
const router = require('./router')
router(app)
app.listen(5000, () => {
  console.log('5000')
})
