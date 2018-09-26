const {createPropertyEntityResolver} = require('./property-entity')

const values = {
  number: {
    type: 'number'
  },
  enum: {
    type: 'string',
    enum: ['good', 'bad']
  },
  array: {
    type: 'array',
    items: [
      {
        type: 'integer'
      }
    ]
  }
}

const {log} = console

const create = ({property, config}) => {
  return createPropertyEntityResolver({property, config})
}

const config = {
  _meta: {
    types: {
      number: 'float'
    }
  }
}

describe('PropertyEntityResolver', () => {
  describe('primitive: number', () => {
    const value = values.number
    const name = 'age'
    const property = {
      name,
      key: name,
      ...value
    }
    const resolver = create({property, config})

    describe('selectEntity', () => {
      describe('one primitive result', () => {
        const map = {
          primitive: {
            name: 'x'
          }
        }
        const entity = resolver.selectEntity(map)
        test('selects only value', () => {
          expect(entity.name).toEqual('x')
        })
      })

      describe('enum and primitive results', () => {
        const map = {
          primitive: {
            name: 'x'
          },
          enum: {
            name: 'myEnum'
          }
        }
        const entity = resolver.selectEntity(map)
        test('selects enum over primitive', () => {
          expect(entity.name).toEqual('myEnum')
        })
      })

      describe('multiple conflicting results', () => {
        const map = {
          primitive: {
            name: 'x'
          },
          type: {
            name: 'myType'
          }
        }

        test('throws', () => {
          try {
            resolver.selectEntity(map)
          } catch (err) {
            expect(err).toBeTruthy()
          }
        })
      })
    })

    describe('resolve', () => {
      const entity = resolver.resolve()

      test('entity object', () => {
        expect(entity).toBeTruthy()

      })

      test('primitive', () => {
        const {type, name} = entity
        expect(type.kind).toEqual('primitive')
        expect(type.property).toEqual('number')
        expect(type.expanded).toEqual('number')
        expect(name.property.key).toEqual('age')
        expect(type.resolved).toEqual('Float')
      })
    })
  })
})

describe.only('PropertyEntityResolver: Array', () => {
  describe('primitive: array', () => {
    const name = 'scores'
    const property = {
      ...values.array,
      name,
      key: name
    }
    const resolver = create({property, config})
    // log({resolver})

    describe('resolve', () => {
      const entity = resolver.resolve()
      const {type, name} = entity
      // log({entity, type, name})
      test('entity object', () => {
        expect(entity).toBeTruthy()
      })

      describe('type', () => {
        test('kind', () => {
          expect(type.kind).toEqual('primitive')
        })

        test('expanded', () => {
          expect(type.expanded).toEqual('array')
        })

        test('prop key', () => {
          expect(name.property.key).toEqual('scores')
        })

        test('resolved', () => {
          expect(type.resolved).toEqual('Int')
        })
      })

      test('is list?', () => {
        expect(entity.list).toBe(true)
      })
    })
  })
})

describe('PropertyEntityResolver: Enum', () => {
  describe('enum: colors', () => {
    describe('primitive: number', () => {
      const name = 'colors'
      const property = {
        ...values.enum,
        name,
        key: name
      }
      const resolver = create({property, config})

      describe('resolve', () => {
        const entity = resolver.resolve()
        test('result object', () => {
          expect(entity).toBeTruthy()
        })

        test('enum', () => {
          const {name, values} = entity

          expect(name.property.key).toEqual('colors')
          expect(values).toEqual(['good', 'bad'])
        })
      })
    })
  })
})
