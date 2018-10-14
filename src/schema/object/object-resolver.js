const {Base} = require('../../base')
const {camelize, isStringType, isObjectType} = require('./utils')
const {createPropertiesResolver} = require('./properties-resolver')
const {Fingerprint} = require('./property/types/object/fingerprint')

const createObjectResolver = ({object, config, opts}) => {
  return new ObjectResolver({object, config, opts})
}

const resolveSchema = (opts) => {
  return resolve({
    ...opts,
    name: 'resolveSchema'
  })
}

const resolve = ({
  schema,
  object,
  config,
  name = 'resolve',
  opts = {}
}) => {
  const $object = object || schema
  const resolver = createObjectResolver({
    object: $object,
    config,
    opts: {
      schema: !!schema,
      ...opts
    }
  })

  return resolver[name]()
}

class ObjectResolver extends Base {
  constructor({object, config, opts}) {
    super(config, opts)
    this.object = object
    this.config = config
    this.opts = opts || {}
    if (!object) {
      this.error('Missing object to resolve')
    }

    this.schema = opts.schema
    const {
      title,
      name,
      type,
      key,
      properties,
      required
    } = object
    this.title = title
    this.name = name
    this.key = key
    this.type = type
    this.properties = properties
    this.required = required || []

    if (this.isSchema) {
      this.definitions = object.definitions || {}
      this.config.$schemaRef = object
    }
    this.addFingerprint()
  }

  addFingerprint() {
    this.fingerprint = this.createFingerprint()
    this.cache[this.hash] = this.object
  }

  get hash() {
    return this.fingerprint.hash
  }

  addFingerprint() {
    this.fingerprint = this.createFingerprint()
    this.addToCache()
  }

  addToCache() {
    if (this.wasCached) {
      this.warn('addToCache', 'object was already cached', {object: this.fingerprint})
      return
    }
    this.cache[this.hash] = this.property
  }

  get wasCached() {
    return Boolean(this.cached)
  }

  get cache() {
    this.config.cache = this.config.cache || {}
    return this.config.cache || {}
  }

  get cached() {
    return this.cache[this.hash]
  }

  get hash() {
    return this.fingerprint.hash
  }

  createFingerprint() {
    return new Fingerprint({object: this.object, config: this.config})
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

  validateName(name) {
    !isStringType(name) && this.error('resolve', `unable to determine schema name or object owner name: ${name}`)
  }

  resolveSchema() {
    this.resolve({
      collections: ['properties', 'definitions']
    })
  }

  shouldResolve() {
    return true
  }

  resolve({collections} = {}) {
    collections = collections || ['properties']
    if (!this.shouldResolve) 
      return

    const map = collections.reduce((acc, name) => {
      acc[name] = this.resolveCollection(name)
      return acc
    }, {})

    return this.isSchema
      ? map
      : map.properties
  }

  resolveCollection(mapName = 'properties') {
    this.validate()
    const schemaName = this.title || this.name || this.key || 'unknown'
    const name = camelize(schemaName)
    this.validateName(name)
    this.normalize()
    const properties = this[mapName]
    const object = {
      owner: {
        name
      },
      properties
    }
    const resolver = createPropertiesResolver({object, config: this.config})
    return resolver.resolve()
  }

  normalize() {
    this.shouldNormalize && this.normalizeProps()
  }

  // if schema is received via value, we must assume it comes from a recursive
  // object resolve
  get shouldNormalize() {
    return Boolean(this.isSchema)
  }

  get isSchema() {
    return Boolean(this.schema)
  }

  normalizeProps() {
    this.properties = Object
      .keys(this.properties)
      .reduce(this.normalizeRequired.bind(this), {})
  }

  normalizeRequired(acc, key) {
    const property = this.properties[key]
    const isRequired = this
      .required
      .indexOf(key) >= 0
    property.required = property.required || isRequired
    acc[key] = property
    return acc
  }
}

module.exports = {
  resolve,
  resolveSchema,
  createObjectResolver,
  ObjectResolver
}
