const {Base} = require('../../../../../base')
const {camelize, isObjectType} = require('../utils')

const createObjectTypeNameResolver = ({object, config}) => {
  return new ObjectTypeNameResolver({object, config})
}

class ObjectTypeNameResolver extends Base {
  constructor({object, config}) {
    super(config)
    this.object = object
    this.config = config
    this.validate()
  }

  get isValidType() {
    return this.object.type === 'object'
  }

  get isAnObject() {
    return isObjectType(this.object)
  }

  get hasPropertiesObject() {
    return isObjectType(this.object.properties)
  }

  validateObject() {
    !this.isAnObject && this.error('validate', `object must be a javascript object, was: ${typeof this.object}`)
    return true
  }

  validateType() {
    !this.isValidType && this.error('validate', 'must have type: object')
    return true
  }

  validateProperties() {
    !this.hasPropertiesObject && this.error('validate', 'must have a properties object')
    return true
  }

  validate() {
    return this.validateObject() && this.validateType() && this.validateProperties()
  }

  resolve() {
    return this.resolvedTypeName
  }

  get typeName() {
    const {object} = this
    const name = this.resolvedTypeName || object.defaultType
    if (!name) {
      console.log({object})
      this.error('typeName', `No type name could be determined: ${name}`)
    }
    return camelize(name)
  }

  get resolvedTypeName() {
    const {object} = this
    const {typeName} = object
    const {name, type} = object.shape || {}
    let {property} = name || {}
    let {resolved, fullName} = type || {}
    this._resolvedTypeName = this._resolvedTypeName || (typeName || resolved || fullName || property)
    return this._resolvedTypeName
  }
}
module.exports = {
  createObjectTypeNameResolver,
  ObjectTypeNameResolver
}
