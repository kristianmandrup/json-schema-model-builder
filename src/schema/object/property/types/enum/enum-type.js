const {BaseType} = require('../base-type')
const {camelize} = require('../utils')

function isEnum(property) {
  return Array.isArray(property.enum)
}

function resolve({property, config}) {
  return EnumType
    .create({property, config})
    .apply()
}

class EnumType extends BaseType {
  shouldApply() {
    return isEnum(this.property)
  }

  get expandedType() {
    return 'enum'
  }

  get enum() {
    return this.property.enum
  }

  get kind() {
    return 'enum'
  }

  get resolvedTypeName() {
    return 'Enum'
  }

  static create(property, config) {
    return new EnumType(property, config)
  }

  get shape() {
    return {
      ...super.shape,
      values: this.values
    }
  }

  get values() {
    return this.enum
  }
}

module.exports = {
  isEnum,
  resolve,
  EnumType
}
