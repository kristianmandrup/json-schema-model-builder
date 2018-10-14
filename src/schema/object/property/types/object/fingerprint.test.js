const {Fingerprint} = require('./fingerprint')

describe('Fingerprint', () => {
  const object = {
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'number'
      }
    }
  }
  const config = {}
  const fingerprint = new Fingerprint({object, config})

  describe('propsObj', () => {
    test('returns object', () => {
      expect(fingerprint.propsObj).toEqual({
        names: [
          'name', 'age'
        ],
        types: ['string', 'number']
      })
    })
  })

  describe('propNames', () => {
    test('returns names of properties', () => {
      expect(fingerprint.propNames).toEqual(['name', 'age'])
    })
  })

  describe('fingerPrintObj', () => {
    test('returns object', () => {
      expect(fingerprint.propNames).toEqual(['name', 'age'])
    })
  })

  describe('hash', () => {
    test('returns hash string', () => {
      expect(fingerprint.hash).toEqual("797151ea4e0c45952436432324df3c4330b479ad")
    })
  })
})
