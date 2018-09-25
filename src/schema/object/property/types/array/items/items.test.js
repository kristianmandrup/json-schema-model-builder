const {ItemsResolver} = require('./items')

describe('ItemsResolver', () => {
  const strItem = {
    type: 'string'
  }
  const intItem = {
    type: 'integer'
  }
  const items = [strItem, intItem]
  const config = {}

  const resolver = new ItemsResolver({items, config})

  describe('typeResolver', () => {
    const resolved = resolver.typeResolver(strItem)
    test('resolves', () => {
      expect(resolved).toEqual('String')
    })
  })

  describe('resolveItem', () => {
    describe('primitive type', () => {
      test('resolves string', () => {
        const resolved = resolver.resolveItem(strItem)
        expect(resolved).toEqual('String')
      })

      test('resolves integer', () => {
        const resolved = resolver.resolveItem(intItem)
        console.log({resolved})
        expect(resolved).toEqual('Int')
      })
    })

    describe('named object type', () => {
      const resolved = resolver.resolveItem({name: 'account', typeName: 'MyAccount', type: 'object', properties: {}})

      test('resolves to name', () => {
        expect(resolved).toEqual('MyAccount')
      })
    })
  })

  describe('resolve', () => {
    const resolved = resolver.resolve()

    test('resolves', () => {
      expect(resolved).toEqual(['String', 'Int'])
    })
  })
})
