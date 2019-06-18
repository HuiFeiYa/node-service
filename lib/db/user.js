const User = require('./model')
async function findAll() {
  return User.findAll()
}
async function createOpenid(options) {
  return User.create(options)
}
// 根据条件查询数据，如下：查找表中op值为 openid的数据
async function getOpenid(openid) {
  return User.findAll({
    where: { op: openid }
  })
}
async function updateTime(target, time) {
  return target.update(time)
}
module.exports = {
  findAll,
  createOpenid,
  getOpenid,
  updateTime
}
