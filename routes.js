const fs = require('fs')

module.exports = function (app) {
  fs.readdirSync(__dirname + '/api').forEach((file) => {
    if (!file.includes('.js')) return
    require(`./api/${file.split('.js')[0]}`)(app)
  })
}