const { getSession } = require('../lib/wx')
// 登陆获取session对象 { session_key: 'IijQhU1GzhFDhcktFke3Zw==',openid: 'oK_DE5JkX3Be4Nb-1djqVbdrsQhU' }
async function login(code) {
  return await getSession(code)
}

module.exports = {
  login
}
