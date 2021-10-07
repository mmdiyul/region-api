class Helper {
  constructor() {}

  static parseQuery(query) {
    const filter = []
    const sort = []
    let page = 1
    let limit = null
    Object.keys(query).forEach(item => {
      if (item == 'page') {
        page = parseInt(query[item])
      } else if (item == 'limit') {
        limit = parseInt(query[item])
      } else if (item == 'sort') {
        query[item].split(',').forEach(item => {
          if (item.includes('-')) {
            sort.push({
              attribute: item.split('-')[1],
              direction: 'desc'
            })
          } else {
            sort.push({
              attribute: item,
              direction: 'asc'
            })
          }
        })
      } else {
        Object.keys(query[item]).forEach(key => {
          let operator = key == 'eq' ? '=' : (key == 'ne' ? '!=' : null)
          if (operator) {
            filter.push({
              attribute: item,
              operator: operator,
              value: this.isNumeric(query[item][key]) ? parseInt(query[item][key]) : query[item][key].toUpperCase()
            })
          }
        })
      }
    })
    return {page, limit, sort, filter}
  }

  static sortData(data, sort) {
    sort.map(item => {
      if (item.direction == 'asc') {
        data = data.sortBy(item.attribute)
      } else {
        data = data.sortByDesc(item.attribute)
      }
    })
    return data
  }

  static filterData(data, filter) {
    filter.map(item => {
      data = data.where(item.attribute, item.operator, item.value)
    })
    return data
  }

  static pagination(data, page, limit) {
    return data.forPage(page, limit)
  }

  static getLastPage(totalData, page, limit) {
    if (!page || !limit) return 1
    return Math.ceil(totalData / limit)
  }

  static isNumeric(value) {
    return /^-?\d+$/.test(value);
  }
}

module.exports = Helper