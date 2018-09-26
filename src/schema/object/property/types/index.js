const {BaseType, PropError} = require('./base-type')
const {capitalize} = require('./utils')

const types = {
  array: require('./array/array-type'),
  boolean: require('./boolean/boolean-type'),
  number: require('./number/number-type'),
  object: require('./object/object-type'),
  string: require('./string/string'),
  date: require('./date/date-type'),
  enum: require('./enum/enum-type')
}

const typeNames = [
  'array',
  'boolean',
  'number',
  'object',
  'string',
  'date',
  'enum'
]

const resolvers = typeNames.reduce((acc, name) => {
  acc[name] = types[name].resolve
  return acc
}, {})

const classes = typeNames.reduce((acc, name) => {
  const className = `${capitalize(name)}Type`
  acc[name] = types[name][className]
  return acc
}, {})

module.exports = {
  resolvers,
  classes
}
