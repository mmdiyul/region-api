const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const isDevMode = !process.env.NODE_ENV ? true : process.env.NODE_ENV == 'development'

require('./routes')(app)

app.get('/', (req, res) => {
  const host = `${req.protocol}://` + (isDevMode ? `${req.hostname}:${port}` : req.hostname)
  res.status(200).send({
    statusCode: 200,
    message: "Welcome to Indonesian Regions API",
    data: [
      {
        name: 'Province',
        route: `${host}/provinces`
      },
      {
        name: 'Regency',
        route: `${host}/regencies`
      },
      {
        name: 'District',
        route: `${host}/districts`
      },
      {
        name: 'Village',
        route: `${host}/villages`
      }
    ]
  })
})

app.get('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    message: "Route not found!",
    data: null
  })
})

app.listen(port, () => {
  console.log(`App running at port ${port}...`)
})