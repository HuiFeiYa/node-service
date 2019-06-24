const User = require('./model')
async function findAllUser() {
  return User.findAll()
}
async function findUserById(id) {
  return User.findByPk(id)
}
async function findUserByName(username) {
  return User.findAll({
    where: {
      username
    }
  })
}
async function createUser(params) {
  return User.create(params)
}
module.exports = {
  findAllUser,
  findUserByName,
  findUserById,
  createUser
}
