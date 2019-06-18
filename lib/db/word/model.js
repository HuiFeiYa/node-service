let Sequelize = require('sequelize')
// 连接数据库
let sequelize = new Sequelize('greet', 'root', 'password', {
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
const Word = sequelize.define(
  'word',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    audio: Sequelize.STRING(100),
    video: Sequelize.STRING(100),
    en_word: Sequelize.STRING(20),
    movie_text: Sequelize.ARRAY(6000),
    en_audio: Sequelize.STRING(15),
    cn_word: Sequelize.STRING(10)
  },
  { timestamps: false }
)
module.exports = Word
