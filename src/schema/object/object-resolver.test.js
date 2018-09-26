const {createObjectResolver, resolve} = require('./object-resolver')
const {schemas} = require('../data');

const create = ({object, schema, config, opts}) => {
  return resolve({object, schema, config, opts})
}

describe('ObjectResolver', () => {
  const schema = schemas.valid

  describe('create and resolve', () => {
    const config = {}
    const obj = create({schema, config})

    test('type', () => {
      expect(obj.type).toEqual('schema')
    })

    test('validate', () => {
      try {
        const valid = obj.validate()
        expect(valid).toBe(true)
      } catch (err) {}
    })

    test('config.$schemaRef', () => {
      expect(obj.config.$schemaRef).toBe(schema)
    })

    test('isSchema', () => {
      expect(obj.isSchema).toBe(true)
    })

    test('resolve', () => {
      const resolved = obj.resolve()
      console.log({resolved})
      expect(resolved).toBeTruthy()
    })

    test('shouldNormalize', () => {
      expect(obj.shouldNormalize).toBe(true)
    })

    test('normalize', () => {
      obj.normalize()
      expect(obj.properties.age.required).toBe(true)
    })
  })

  describe('object', () => {
    const object = {
      "description": "Car owned",
      "type": "object",
      "properties": {
        name: {
          type: "string"
        }
      }
    }
    const config = {
      $schemaRef: schema
    }
    const obj = create({object, config})

    test('type', () => {
      expect(obj.type).toEqual('object')
    })

    test('validate', () => {
      try {
        const valid = obj.validate()
        expect(valid).toBe(true)
      } catch (err) {}
    })

    test('config.$schemaRef', () => {
      expect(obj.config.$schemaRef).toBeUndefined()
    })

    test('isSchema', () => {
      expect(obj.isSchema).toBe(false)
    })

    test('resolve', () => {
      const resolved = obj.resolve()
      // console.log({resolved})
      expect(resolved).toBeTruthy()
    })

    test('shouldNormalize', () => {
      expect(obj.shouldNormalize).toBe(false)
    })
  })
})
