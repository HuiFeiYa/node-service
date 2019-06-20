const User = require('./model')
async function findAllUser() {
  return User.findAll()
}
async function findUserByName(username) {
  return User.findAll({
    where: {
      username
    }
  })
}
module.exports = {
  findAllUser,
  findUserByName
}
