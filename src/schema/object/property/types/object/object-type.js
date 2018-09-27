const hash = require('object-hash')
const {BaseType} = require('../base-type')
const {createObjectTypeNameResolver} = require('./type-name')

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
    this.objTypeName = typeName
    this.addFingerprint()
  }

  addFingerprint() {
    this.fingerprint = this.createFingerprint()
    this.config.visited = this.config.visited || []
    this.config.cache[fingerprint] = this.property
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

  get propNames() {
    return Object.keys(this.properties)
  }

  createFingerprint() {
    const obj = {
      ...this.propNames,
      ownerName: this.owner.name
    }
    console.log('fingerprint', obj)
    return hash(obj)
  }

  resolveTypeName() {
    this.objectTypeNameResolver = createObjectTypeNameResolver({object: this, config: this.config})
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
    return this.config.cached[this.fingerprint]
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
    const objResolver = createObjectResolver({object, config: this.config})
    objResolver.resolve()
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

const {createObjectResolver} = require('../../../properties-resolver')
