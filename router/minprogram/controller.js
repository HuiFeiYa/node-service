const request = require('request')
const {
  findAll,
  createOpenid,
  getOpenid,
  updateTime
} = require('../../lib/db/minprogram/login/user')
const { getCurrentTime } = require('../../utils/date')
const { client } = require('../utils')
const { encode } = require('../../lib/crypto.js')
const WXBizDataCrypt = require('./WXBizDataCrypt')
const appId = 'wxc61d58d3c32c497e'
async function login(ctx) {
  const { code, data, iv } = ctx.request.body
  console.log('获取的数据', code, data, iv)

  const all = await findAll()
  const session = await getSession(code)
  if (session) {
    const { session_key, openid } = session
    const pc = new WXBizDataCrypt(appId, session_key)
    const result = pc.decryptData(data, iv)

    console.log('解密后', result)

    // 查找数据是否已经存有openid，进行数据库相关逻辑操作
    await checkOpenid(ctx, openid)
    client(ctx, { token: encode(openid) })
  } else {
    throw new Error('登陆失败')
  }
}
async function checkOpenid(ctx, openid) {
  const resultList = await getOpenid(openid)
  // 判断数据库中是否有对应的openid, 如果没有则创建，有就更新时间
  if (resultList.length === 0) {
    const options = {
      price: '12.32',
      lastLogin: getCurrentTime(),
      op: openid
    }
    createOpenid(options)
  } else {
    updateTime(resultList[0], { updatedAt: Date() })
  }
}
async function getSession(code) {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxc61d58d3c32c497e&secret=03b5dc2d2275f95782c8efbffcdcd740&js_code=${code}&grant_type=authorization_code`
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        method: 'GET',
        json: true
      },
      (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          if (body.errcode) {
            reject(new Error(body.errmsg))
          } else {
            resolve(body)
          }
        }
      }
    )
  })
}
module.exports = {
  login
}
