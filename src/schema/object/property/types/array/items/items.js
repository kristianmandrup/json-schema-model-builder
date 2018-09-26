const {createPropertyEntityResolver} = require('../../../property-entity')
const {Base} = require('../../../../../../base')
const {isFunctionType} = require('../../utils')

const createItemsResolver = ({items, config}) => {
  return new ItemsResolver({items, config})
}

class ItemsResolver extends Base {
  constructor({
    items,
    config = {}
  }) {
    super(config)
    this.items = items
    this.config = config
    this.createPropertyEntityResolver = this.getCreatePropertyEntityResolver(config)
  }

  getCreatePropertyEntityResolver(config) {
    return (config.factories || {}).createPropertyEntityResolver || createPropertyEntityResolver
  }

  resolve() {
    return this
      .items
      .map(this.resolveItem.bind(this))
  }

  resolveItem(item) {
    return this.typeResolver(item)
  }

  typeResolver(item) {
    if (!isFunctionType(this.createPropertyEntityResolver)) {
      this.error('typeResolver', 'Missing createPropertyEntityResolver (pass in config factories map)')
    }
    const types = this
      .createPropertyEntityResolver({property: item, config: this.config})
      .resolveTypes()
    types.length > 1 && this.error('typeResolver', 'should only resolve to a single type', types)
    return types[0]
  }
}

module.exports = {
  createItemsResolver,
  ItemsResolver
}
