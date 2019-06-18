let Sequelize = require('sequelize')
// 连接数据库
let sequelize = new Sequelize('minprogram', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate() //连接测试
  .then(() => {
    console.log('mysql is Success')
  })
  .catch(err => {
    console.log(err)
  })
const User = sequelize.define(
  'login',
  {
    id: {
      type: Sequelize.STRING(100),
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING(100),
    created: Sequelize.STRING(100),
    lastLogin: Sequelize.STRING(100),
    avatar: Sequelize.STRING(100),
    op: Sequelize.STRING(100),
    userType: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
  },
  { timestamps: false }
)
module.exports = User
