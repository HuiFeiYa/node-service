const Koa = require('koa')
const app = new Koa()
const router = require('./router')
router(app)
app.listen(8080, () => {
  console.log('8080')
})
