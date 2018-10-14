const {PrimitiveType} = require('../primitive')
const {isDate} = require('./utils')
const {camelize} = require('../utils')

function resolve({property, config}) {
  return DateType
    .create({property, config})
    .apply()
}

class DateType extends PrimitiveType {
  shouldApply() {
    return isDate(this.property)
  }

  get expandedType() {
    return 'date'
  }

  get resolvedTypeName() {
    return camelize(this._types.date || 'Date')
  }

  static create(obj) {
    return new DateType(obj)
  }
}

module.exports = {
  resolve,
  isDate,
  DateType
}
