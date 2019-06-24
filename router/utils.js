const jsonMine = 'application/json'
function client(ctx, data, code = 0, message = 'success') {
  ctx.type = jsonMine
  ctx.body = {
    code,
    data,
    message
  }
}
module.exports = {
  client
}
