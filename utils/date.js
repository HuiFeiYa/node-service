// 小于十自动补零
const fillZero = number => (number < 10 ? '0' + number : number)
// 获取当前时间
function getCurrentTime() {
  const dtCur = new Date()
  const yearCur = dtCur.getFullYear()
  const monCur = dtCur.getMonth() + 1
  const dayCur = dtCur.getDate()
  const hCur = dtCur.getHours()
  const mCur = dtCur.getMinutes()
  const sCur = dtCur.getSeconds()
  timeCur =
    yearCur +
    '-' +
    fillZero(monCur) +
    '-' +
    fillZero(dayCur) +
    ' ' +
    fillZero(hCur) +
    ':' +
    fillZero(mCur) +
    ':' +
    fillZero(sCur)
  return timeCur
}

module.exports = {
  getCurrentTime
}
