const Koa = require('koa')
const app = new Koa()
const cors = require('./utils/cors')
const router = require('./router')
app.use(cors())
router(app)
app.listen(8082, () => {
  console.log('8082')
})
