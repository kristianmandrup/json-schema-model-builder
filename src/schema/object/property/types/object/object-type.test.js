const {resolve, isObject} = require('./object-type')

const objects = {
  invalid: {
    type: 'number'
  },
  bad: {
    type: 'object'
  },
  account: {
    "description": "Bank account",
    type: 'object',
    typeName: 'Account',
    refType: 'embedded',
    properties: {
      "name": {
        "type": "string"
      }
    }
  },
  referenced: {
    type: 'object',
    refType: 'reference',
    properties: {},
    "$ref": "#/definitions/car"
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
  const value = objects[key]
  if (!value) {
    throw new Error(`no such object entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isObject', () => {
  describe('type: object', () => {
    const check = isObject({type: 'object'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: string', () => {
    const check = isObject({type: 'string'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

describe('resolve', () => {
  test('invalid type', () => {
    const obj = create('invalid')
    expect(obj).toBeFalsy()
  })

  test('bad type', () => {
    try {
      const obj = create('bad')
      const {shape} = obj
      expect(shape.valid).toBe(false)
    } catch (err) {
      console.log(err)
    }
  })

  describe('nested', () => {
    describe('valid type with embedded object using typeName', () => {
      const obj = create('account')
      const {shape} = obj
      test('is valid', () => {
        expect(shape.valid).toBe(true)
      })

      test('resolvedTypeName', () => {
        expect(obj.resolvedTypeName).toEqual('Account')
      })

      describe('type', () => {
        test('kind is type', () => {
          expect(shape.type.kind).toEqual('type')
        })
        test('embedded type', () => {
          expect(shape.type.refType).toEqual('embedded')
        })
        test('resolved to Account', () => {
          expect(shape.type.resolved).toEqual('Account')
        })
        test('fullname is ??', () => {
          expect(shape.type.fullName).toEqual('Account')
        })

      })
    })
  })

  describe('referenced', () => {
    test('valid type', () => {
      const obj = create('referenced', {
        rootSchema: {
          definitions: {
            car: {
              type: 'string',
              typeName: 'SuperCar'
            }
          }
        }
      })
      const {shape} = obj
      // console.log({shape, type: shape.type, ref: shape.type.reference})
      expect(shape.valid).toBe(true)
      expect(shape.type.kind).toEqual('type')
      expect(shape.type.refType).toEqual('reference')
      expect(shape.type.reference.name).toEqual('Car')
    })
  })
})
