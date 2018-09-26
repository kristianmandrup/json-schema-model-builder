const {Base} = require('../../../../../base')
const {camelize, isObjectType} = require('../utils')

const createObjectTypeNameResolver = ({object, config}) => {
  return new ObjectTypeNameResolver({object, config})
}

class ObjectTypeNameResolver extends Base {
  constructor({object, config}) {
    super(config)
    this.object = object
    this.property = object.property
    this.config = config
    this.validate()
  }

  get isValidType() {
    return this.property.type === 'object'
  }

  get isAnObject() {
    return isObjectType(this.property)
  }

  get hasPropertiesObject() {
    return isObjectType(this.property.properties)
  }

  validateObject() {
    !this.isAnObject && this.error('validate', `object must be a javascript object, was: ${typeof this.property}`)
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
    return this.validateObject() && this.validateType() // && this.validateProperties()
  }

  resolve() {
    return this.resolvedTypeName
  }

  get typeName() {
    const {object} = this
    const name = this.resolvedTypeName || object.defaultType
    if (!name) {
      this.error('typeName', `No type name could be determined: ${name}`)
    }
    return camelize(name)
  }

  get resolvedTypeName() {
    const {typeName} = this.property
    const {name, type} = this.property.shape || {}
    let {property: propName} = name || {}
    let {resolved, fullName, reference} = type || {}
    let refName = (reference || {}).name
    this._resolvedTypeName = this._resolvedTypeName || (typeName || refName || resolved || fullName || propName)
    return this._resolvedTypeName
  }
}
module.exports = {
  createObjectTypeNameResolver,
  ObjectTypeNameResolver
}
