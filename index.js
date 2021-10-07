const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./routes')(app)

app.listen(port, () => {
  console.log(`App running at port ${port}...`)
})