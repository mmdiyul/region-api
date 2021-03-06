const collect = require('collect.js')
const helpers = require('../helpers')

module.exports = function (app) {
  app.get('/districts', (req, res) => {
    const {page, limit, sort, filter} = helpers.parseQuery(req.query)
    let data = collect(require('../regions/districts.json'))
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

  app.get('/districts/:id', (req, res) => {
    const id = req.params.id
    let data = collect(require('../regions/districts.json'))
    data = data.where('id', parseInt(id)).first()
    res.status(data ? 200 : 404).send({
      statusCode: data ? 200 : 404,
      message: data ? "OK!" : `District with id: ${id} not found!`,
      data: data ?? null
    })
  })
}
