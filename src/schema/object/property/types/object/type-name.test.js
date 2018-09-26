const {createObjectTypeNameResolver} = require('./type-name')

const shape = {
  name: {},
  type: {}
}

const properties = {}

const objects = {
  invalid: {
    "name": {
      "type": "string"
    }
  },
  typeOnly: {
    "type": "object",
    shape: {
      name: {
        full: 'x'
      }
    },
    defaultType: 'Any',
    properties: {}
  },
  keyOnly: {
    "key": "person",
    "type": "object",
    defaultType: 'Any',
    shape,
    properties
  },
  withTypeName: {
    "typeName": "Account",
    "type": "object",
    owner: {},
    defaultType: 'Any',
    shape,
    properties

  },
  keyOwner: {
    "key": "account",
    "owner": {
      name: "person"
    },
    "type": "object",
    defaultType: 'Any',
    shape: {
      type: {
        fullName: 'PersonAccount'
      }
    },
    properties
  },
  keyOwnerAndTypeName: {
    "key": "account",
    "owner": {
      name: "person"
    },
    "typeName": "Account",
    "type": "object",
    defaultType: 'Any',
    shape,
    properties
  },
  named: {
    "type": "object",
    "name": "car",
    defaultType: 'Any',
    shape,
    properties
  },
  ref: {
    "type": "object",
    "name": "#/definitions/SportsCar",
    defaultType: 'Any',
    shape: {
      type: {
        resolved: 'SportsCar'
      }
    },
    properties
  }
}

const create = (name, config = {}) => {
  return createObjectTypeNameResolver({object: objects[name], config})
}

describe('ObjectTypeNameResolver', () => {
  describe('invalid', () => {})

  describe('type resolved', () => {
    const config = {}
    const resolver = create('typeOnly', config)
    test('uses defaultType', () => {
      expect(resolver.typeName).toEqual('Any')
    })
  })

  describe('key only', () => {
    const config = {}
    const resolver = create('keyOnly', config)
    test('uses defaultType', () => {
      expect(resolver.typeName).toEqual('Any')
    })
  })

  describe('key and owner name', () => {
    const config = {}
    const resolver = create('keyOwner', config)
    test('uses full type name from key and owner', () => {
      expect(resolver.typeName).toEqual('PersonAccount')
    })
  })

  describe('key, owner and typeName', () => {
    const config = {}
    const resolver = create('keyOwnerAndTypeName', config)
    test('uses typeName: Account', () => {
      expect(resolver.typeName).toEqual('Account')
    })
  })

  describe('named', () => {
    const resolver = create('named')
    test('uses defaultType', () => {
      expect(resolver.typeName).toEqual('Any')
    })
  })

  describe('definition reference', () => {
    const config = {
      definitions: {}
    }
    const resolver = create('ref', config)

    test('uses ref name resolved', () => {
      expect(resolver.typeName).toEqual('SportsCar')
    })
  })
})
