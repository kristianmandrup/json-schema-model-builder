const camelcase = require('camelcase')

const assign = (variable, value) => {
  variable = value
}

const createAssign = (map) => (pos, value) => {
  map[pos] = value
}

const assignAt = (map, pos, value) => {
  map[pos] = value
}

/**
 * string capitalization - first letter - capital, other - lowercase.
 * @param {String} word - Word or sentence.
 */
const capitalize = (word) => {
  if (!isStringType(word)) {
    throw new Error(`capitalize: Invalid text ${word}`)
  }
  return `${word
    .slice(0, 1)
    .toUpperCase()}${word
    .slice(1)
    .toLowerCase()}`
}

/**
 * Starting camelization - underscores, dividing words replaces to Capital letters
 * sound_text => soundText.
 * @param {String} text - Word or sentence
 * @param {String} separator - delimiter, '_' by default
 */
const camelize = (text, {
  cap = true
} = {}) => {
  if (!isStringType(text)) {
    throw new Error(`camelize: Invalid text ${text}`)
  }
  return camelcase(text, {pascalCase: cap})
}

const isObjectType = (obj) => {
  return obj === Object(obj);
}

const isFunctionType = (obj) => {
  return typeof obj === 'function'
}

const isStringType = (obj) => {
  return typeof obj === 'string'
}

const isArrayType = (obj) => {
  return Array.isArray(obj)
}

function isCollection(col) {
  return isArrayType(col) || isObjectType(col)
}

module.exports = {
  assign,
  assignAt,
  capitalize,
  camelize,
  isFunctionType,
  isCollection,
  isArrayType,
  isObjectType,
  isStringType
}
