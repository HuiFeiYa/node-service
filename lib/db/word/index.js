const Word = require('./model')
async function findAllWord() {
  return Word.findAll()
}
module.exports = {
  findAllWord
}
