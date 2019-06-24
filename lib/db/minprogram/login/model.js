const createModel = require('../../utils/model')
const Sequelize = require('sequelize')
const instance = createModel({
  database: 'minprogram'
})
const Model = instance(
  'login',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
      type: Sequelize.FLOAT(6.2),
      default: '0.00'
    },
    lastLogin: Sequelize.DATE,
    op: Sequelize.STRING(100)
  },
  { timestamps: true }
)
module.exports = Model
