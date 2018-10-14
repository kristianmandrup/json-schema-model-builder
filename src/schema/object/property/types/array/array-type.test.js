const {resolve, isArray} = require('./array-type')

const arrays = {
  invalid: {
    "type": "number"
  },
  embedded: {
    "description": "Bank accounts",
    "type": "array",
    name: 'accounts',
    // refType: 'embedded',
    "items": [
      {
        type: 'object',
        name: "Account",
        properties: {
          "name": {
            "type": "array"
          }
        }
      }
    ]
  },
  strList: {
    "type": "array",
    name: 'accounts',
    // refType: 'embedded',
    "items": [
      {
        type: 'string',
        name: 'Yikes'
      }
    ]
  },
  defRef: {
    "description": "Bank accounts",
    "type": "array",
    "name": "accounts",
    refType: 'reference',
    "items": [
      {
        "$ref": "#/definitions/account"
      }
    ]
  }
}

const config = {}

const createParams = (key, value, config = {}) => {
  const property = {
    key,
    ...value
  }
  return {property, config}
}

const $create = (key, value, config) => {
  const params = createParams(key, value, config)
  return resolve(params)
}

const create = (key, config) => {
  const value = arrays[key]
  if (!value) {
    throw new Error(`no such array entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isArray', () => {
  describe('type: array', () => {
    const check = isArray({type: 'array'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: array', () => {
    const check = isArray({type: 'boolean'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

describe('toArray', () => {
  test('invalid type', () => {
    const arr = create('invalid')
    expect(arr).toBeFalsy()
  })

  describe('item type is string primitive', () => {
    const arr = create('strList')
    const {shape} = arr
    describe('name', () => {
      test('property', () => {
        const expected = {
          "key": "strList",
          "owner": undefined,
          "property": "accounts"
        }
        const {property} = shape.name
        expect(property.key).toEqual('strList')
      })
    })

    describe('type', () => {
      test('expanded: array', () => {
        expect(shape.type.resolved).toEqual('String')
      })
    })
  })

  describe('item type is embedded', () => {
    const arr = create('embedded')
    const {shape} = arr

    describe('name', () => {
      test('property', () => {
        const expected = {
          "key": "strList",
          "owner": undefined,
          "property": "accounts"
        }
        const {property} = shape.name
        expect(property).toEqual(expected)
      })
    })

    describe('type', () => {
      test('expanded: array', () => {
        expect(shape.type.expanded).toEqual('array')
      })

      test('kind: primitive', () => {
        expect(shape.type.kind).toEqual('primitive')
      })

      test('reference: embedded', () => {
        expect(shape.refType).toEqual('embedded')
      })

      test('resolvedName: Account', () => {
        expect(shape.type.resolved).toEqual('Account')
      })
    })
  })

  describe('item type is definiton reference', () => {
    const arr = create('defRef')
    const {shape} = arr

    describe('shape with reference type', () => {
      describe('name', () => {
        test('property', () => {
          expect(shape.name.property).toEqual('accounts')
        })
      })

      describe('type', () => {
        test('expanded: array', () => {
          expect(shape.type.expanded).toEqual('array')
        })

        test('kind: primitive', () => {
          expect(shape.type.kind).toEqual('primitive')
        })

        test('reference: embedded', () => {
          expect(shape.type.refType).toEqual('embedded')
        })

        test('resolvedName: Account', () => {
          expect(shape.type.resolved).toEqual('Account')
        })
      })
    })
  })
})
