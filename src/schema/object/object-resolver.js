const {Base} = require('../../base')
const {camelize, isObjectType} = require('./utils')
const {createPropertiesResolver} = require('./properties-resolver')

const createObjectResolver = ({schema, value, config, opts}) => {
  return new ObjectResolver({schema, value, config, opts})
}

const resolve = ({schema, value, config, opts}) => {
  return createObjectResolver({schema, value, config, opts}).resolve()
}

class ObjectResolver extends Base {
  constructor({object, config, opts}) {
    this.object = object
    this.value = value
    this.config = config
    this.opts = opts || {}

    this.schema = opts.schema

    const {type, properties, required, definitions} = schema
    this.type = type
    this.properties = properties
    this.required = required || []
    this.definitions = definitions || {}

    if (this.isSchema) {
      this.config.$schemaRef = object
    }
  }

  get schemaType() {
    return this.isSchema
      ? 'schema'
      : 'object'
  }

  get hasPropertiesObject() {
    return isObjectType(this.properties)
  }

  get isObject() {
    return this.type === 'object'
  }

  validateType() {
    !this.isObject && this.error(this.schemaType, 'must have type: object')
    return true
  }

  validateProperties() {
    !this.hasPropertiesObject && this.error(this.schemaType, 'must have a properties object')
    return true
  }

  validate() {
    return this.validateProperties() && this.validateType()
  }

  resolve() {
    const schema = this.$schema
    this.validate()
    const name = camelize(schema.title || schema.name)
    this.normalize()
    const object = {
      owner: {
        name: name
      },
      properties: this.properties
    }
    const resolver = createPropertiesResolver({object, config})
    return resolver.resolve()
  }

  normalize() {
    this.shouldNormalize() && this.normalizeProps()
  }

  // if schema is received via value, we must assume it comes from a recursive
  // object resolve
  get shouldNormalize() {
    return this.isSchema
  }

  get isSchema() {
    return this.schema
  }

  normalizeProps() {
    this.properties = Object
      .keys(this.properties)
      .reduce(this.normalizeRequired.bind(this), {})
  }

  normalizeRequired(acc, key) {
    const value = this.properties[key]
    const isRequired = this
      .required
      .indexOf(key) >= 0
    value.required = value.required || isRequired
    acc[key] = value
    return acc
  }
}

module.exports = {
  resolve,
  createObjectResolver,
  ObjectResolver
}
