const {PrimitiveType} = require('../primitive')
const {checkType} = require('../base-type')

function isIntegerType(typeName) {
  return typeName === 'integer'
}

function isInteger(property) {
  return checkType(property, 'integer')
}

function isNumber(property) {
  return checkType(property, 'number') || isInteger(property)
}

function resolve({property, config}) {
  return isNumber(property) && NumberType.create({property, config})
}

class NumberType extends PrimitiveType {
  // allow more type meta control, such as expanded name etc this._types.number ||
  get defaultType() {
    return 'number'
  }

  get expanded() {
    return isIntegerType(this.type)
      ? 'integer'
      : this.defaultType
  }

  get baseType() {
    return this.type.property === 'number'
      ? this.baseNumberType
      : this.baseIntegerType
  }

  get baseNumberType() {
    return this._types.number || this.baseFloatType
  }

  get baseFloatType() {
    return this._types.float || 'Float'
  }

  get baseIntegerType() {
    return this._types.integer || this._types.int || 'Int'
  }

  static create(obj) {
    return new NumberType(obj)
  }
}

module.exports = {
  isNumber,
  resolve,
  NumberType
}
