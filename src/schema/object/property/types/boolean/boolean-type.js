const {PrimitiveType} = require('../primitive')
const {checkType} = require('../base-type')
const {camelize} = require('../utils')

function isBoolean(property) {
  return checkType(property, 'boolean')
}

function resolve({property, config}) {
  return BooleanType
    .create({property, config})
    .apply()
}

class BooleanType extends PrimitiveType {
  shouldApply() {
    return isBoolean(this.property)
  }

  static create(obj) {
    return new BooleanType(obj)
  }

  get resolvedTypeName() {
    return camelize(this._types.boolean || 'Boolean')
  }
}

module.exports = {
  resolve,
  isBoolean,
  BooleanType
}
