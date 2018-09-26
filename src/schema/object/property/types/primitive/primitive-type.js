const {BaseType} = require('../base-type')

class PrimitiveType extends BaseType {
  get category() {
    return 'primitive'
  }
}

module.exports = {
  PrimitiveType
}
