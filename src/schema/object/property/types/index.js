const {BaseType, PropError} = require('./base-type')
const {capitalize} = require('./utils')

const types = {
  array: require('./array'),
  boolean: require('./boolean'),
  number: require('./number'),
  object: require('./object'),
  string: require('./string'),
  date: require('./date'),
  enum: require('./enum')
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
