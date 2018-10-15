const {BaseType} = require('../base-type')
const {createObjectTypeNameResolver} = require('./type-name')
const {Fingerprint} = require('./fingerprint')

// no reason to test for properties, as we might be using $ref instead
function isObject(property) {
  return property.type === 'object'
}

function resolve({property, config}) {
  return isObject(property) && ObjectType
    .create({property, config})
    .resolve()
}

// Allow recursive schema
class ObjectType extends BaseType {
  constructor({property, config, opts}) {
    super({property, config, opts})
    const {properties, typeName} = this.property
    this.properties = properties
    this.createPropertiesResolver = config.createPropertiesResolver
    this.createObjectTypeNameResolver = (config || {}).createObjectTypeNameResolver || createObjectTypeNameResolver
    this.objTypeName = typeName
    this.addFingerprint()
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
    const hash = this.hash
    this.config.cache = this.config.cache || {}
    this.config.cache[hash] = this.property
  }

  get hash() {
    return this.fingerprint.hash
  }

  createFingerprint() {
    return new Fingerprint({object: this.property, config: this.config})
  }

  get shape() {
    return {
      ...super.shape,
      nested: this.nested
    }
  }

  get defaultType() {
    return 'Object'
  }

  resolve() {
    this.resolveType()
    this.resolveNested()
    return this
  }

  resolveType() {
    const type = this.resolveTypeName()
    if (!type) 
      return
    this.dispatch(this.createPayload({type}))
  }

  createPayload(payload) {
    return {
      payload: {
        ...payload,
        shape: this.shape,
        object: true
      }
    }
  }

  resolveTypeName() {
    this.objectTypeNameResolver = this.createObjectTypeNameResolver({object: this, config: this.config})
    return this
      .objectTypeNameResolver
      .resolve()
  }

  get resolvedTypeName() {
    return this.objectTypeNameResolver.typeName
  }

  static create(obj) {
    return new ObjectType(obj)
  }

  get kind() {
    return 'type'
  }

  get collection() {
    return true
  }

  get dictionary() {
    return true
  }

  get wasCached() {
    return Boolean(this.cached)
  }

  get cached() {
    const cache = this.config.cache || {}
    return cache[this.hash]
  }

  resolveNested() {
    if (!this.shouldResolveNested) 
      return this

    const owner = {
      name: this.key
    }
    const object = {
      ...this.property,
      owner
    }
    const propsResolver = this.createPropertiesResolver({object, config: this.config})
    propsResolver.resolve()
    return this
  }

  shouldResolveNested() {
    return this.valid && this.opts.nested && !this.wasCached
  }

  get valid() {
    return this.properties || this.reference
      ? true
      : false
  }
}

module.exports = {
  isObject,
  resolve,
  ObjectType
}
