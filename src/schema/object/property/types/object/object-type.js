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

  // TODO: use object-resolver, passing schema: false
  resolveNested() {
    if (!this.shouldResolveNested) 
      return this
  }

  shouldResolveNested() {
    return this.valid && this.opts.nested
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
