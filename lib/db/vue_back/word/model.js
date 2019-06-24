const createModel = require('../../utils/model')
const Sequelize = require('sequelize')
const instance = createModel({
  database: 'vue_back'
})
const Model = instance(
  'user',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    username: Sequelize.STRING(10),
    password: Sequelize.STRING(15),
    updateTime: Sequelize.STRING(17)
  },
  { timestamps: false }
)
module.exports = Model
// let Sequelize = require('sequelize')
// // 连接数据库
// let sequelize = new Sequelize('vue_back', 'root', 'password', {
//   // host: '118.31.127.58',
//   host: '127.0.0.1',
//   dialect: 'mysql'
// })

// sequelize
//   .authenticate() //连接测试
//   .then(() => {
//     console.log('user mysql connect success')
//   })
//   .catch(err => {
//     console.log(err)
//   })
// const User = sequelize.define(
//   'user',
//   {
//     id: {
//       type: Sequelize.BIGINT,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: Sequelize.STRING(10),
//     password: Sequelize.STRING(15),
//     updateTime: Sequelize.STRING(17)
//   },
//   { timestamps: false }
// )
// module.exports = User
