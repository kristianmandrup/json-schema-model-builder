const {Base} = require('../../../base')
const {isStringType, isObjectType, isFunctionType, assignAt} = require('../../../utils')

const createPropertyEntityResolver = ({property, config}) => {
  return new PropertyEntityResolver({property, config})
}

class PropertyEntityResolver extends Base {
  constructor({property, config}) {
    super(config)
    this.property = property
    this.config = config
    this.dispatcher = config.dispatcher
    this.resolvers = config.resolvers || resolvers
  }

  get sender() {
    return 'propertyEntityResolver'
  }

  isValid() {
    return this.isValidProperty || this.isValidResolvers
  }

  get isValidProperty() {
    return isObjectType(this.property)
  }

  get isValidResolvers() {
    return isObjectType(this.resolvers)
  }

  validate() {
    this.validateResolvers() && this.validateProperty()
  }

  validateResolvers() {
    !this.isValidResolvers && this.error('resolve', 'Invalid resolvers. Must be an object, where each entry is a resolver function')
  }

  validateResolver(resolver, key) {
    !isFunctionType(resolver) && this.error('resolve', `Invalid resolver [${key}]. Must be a function. Was ${typeof resolver}`)
    return true
  }

  validateProperty() {
    !isValidProperty && this.error('resolve', `Invalid property. Must be an object. Was ${typeof this.property}`)
    return true
  }

  resolveMap(shapeResolver) {
    this.validate()
    shapeResolver = shapeResolver || this
      .shapeResolver
      .bind(this)
    const {resolvers} = this
    return Object
      .keys(resolvers)
      .reduce((acc, key) => {
        const resolver = resolvers[key]
        this.validateResolver(resolver, key)
        const resolved = resolver({property: this.property, config: this.config})
        if (!resolved) 
          return acc
        const resultKey = resolved
          ? resolved.kind
          : undefined
        !isStringType(resultKey) && this.error('resolveMap', `resolved entity has invalid or missing kind ${resolved.kind}`)
        const value = shapeResolver(resolved)
        assignAt(acc, resultKey, value)
        return acc
      }, {})
  }

  resolve() {
    const map = this.resolveMap()
    const entity = this.selectEntity(map)
    this.onEntity(entity)
    return entity
  }

  resolveType() {
    const map = this.resolveMap()
    const entity = this.selectEntity(map)
    return this.itemType(entity)
  }

  itemType(item) {
    return item.type.resolved
  }

  shapeResolver(resolved) {
    return resolved.shape
      ? resolved.shape
      : this.error('shapeResolver', 'missing shape', resolved)
  }

  selectEntity(map) {
    const keys = Object.keys(map)
    if (map.primitive && map.enum) {
      return map.enum
    }
    const values = Object.values(map)
    const resultCount = values.length || 0
    resultCount === 0 && this.error('selectEntity', 'no results can be selected from result map', map)

    return resultCount === 1
      ? values[0]
      : this.onSelectConflict({map, values, keys})
  }

  onSelectConflict({map, values, keys}) {
    this.error('selectEntity', `conflicting result: ${keys.join(', ')}`, map)
  }

  onEntity(entity) {
    this.dispatch({
      payload: {
        ...entity
      }
    })
  }

  dispatch({payload}) {
    const event = {
      sender: this.sender,
      payload: payload
    }
    if (!this.dispatcher) {
      this.warn('dispatch', 'missing dispatcher')
      return
    }

    this
      .dispatcher
      .dispatch(event)
  }
}

module.exports = {
  createPropertyEntityResolver,
  PropertyEntityResolver
}

const {resolvers} = require('./types')
