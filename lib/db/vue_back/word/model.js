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
    updateTime: Sequelize.BIGINT(100),
    userid: Sequelize.BIGINT(5)
  },
  { timestamps: false }
)
module.exports = Model
