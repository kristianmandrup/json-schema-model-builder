const {PrimitiveType} = require('../primitive')

function isString(property) {
  return property.type === 'string'
}

const resolve = ({property, config}) => {
  return StringType
    .create({property, config})
    .apply()
}

class StringType extends PrimitiveType {
  shouldApply() {
    return isString(this.property)
  }

  get defaultType() {
    return 'String'
  }

  get baseType() {
    return this._types.string || this.defaultType
  }

  static create(obj) {
    return new StringType(obj)
  }
}

module.exports = {
  resolve,
  isString,
  StringType
}
