const {Base} = require('../base')
const {object} = require('./object')
const {resolveSchema} = object

const createSchema = ({schema, config}) => {
  return new Schema({schema, config})
}

class Schema extends Base {
  constructor({schema, config}) {
    super(config)
    this.schema = schema
    this.properties = schema.properties
  }

  resolve() {
    // resolves both properties AND definitions
    resolveSchema({
      object: this.schema,
      config: this.config,
      opts: {
        schema: true
      }
    })
  }
}

module.exports = {
  createSchema,
  Schema
}
