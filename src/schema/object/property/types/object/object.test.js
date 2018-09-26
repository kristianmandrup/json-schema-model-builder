const {resolve, isObject} = require('./object')

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
    properties: {
      "name": {
        "type": "string"
      }
    }
  },
  referenced: {
    type: 'object',
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
    test('valid type with embedded object using typeName', () => {
      const obj = create('account')
      const {shape} = obj
      expect(shape.valid).toBe(true)
      expect(shape.kind).toEqual('type')
      expect(shape.type.refType).toEqual('embedded')
      expect(shape.type.resolved).toEqual('Account')
    })
  })

  describe('referenced', () => {
    test('valid type', () => {
      const obj = create('referenced')
      const {shape} = obj
      expect(shape.valid).toBe(true)
      expect(shape.kind).toEqual('type')
      expect(shape.type.refType).toEqual('reference')
      expect(shape.type.resolved).toEqual('Car')
    })
  })
})
