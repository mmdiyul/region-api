const collect = require('collect.js')
const helpers = require('../helpers')

module.exports = function (app) {
  app.get('/regencies', (req, res) => {
    const {page, limit, sort, filter} = helpers.parseQuery(req.query)
    let data = collect(require('../regions/regencies.json'))
    if (filter) data = helpers.filterData(data, filter)
    const totalData = data.count()
    if (sort) data = helpers.sortData(data, sort)
    if (page && limit) data = helpers.pagination(data, page, limit)
    res.status(200).send({
      statusCode: 200,
      message: "OK!",
      page: page,
      limit: limit,
      lastPage: helpers.getLastPage(totalData, page, limit),
      total: totalData,
      totalOnPage: data.count(),
      data: data
    })
  })

  app.get('/regencies/:id', (req, res) => {
    const id = req.params.id
    let data = collect(require('../regions/regencies.json'))
    data = data.where('id', parseInt(id)).first()
    res.status(200).send({
      statusCode: data ? 200 : 404,
      message: data ? "OK!" : `Regency with id: ${id} not found!`,
      data: data ?? null
    })
  })
}
