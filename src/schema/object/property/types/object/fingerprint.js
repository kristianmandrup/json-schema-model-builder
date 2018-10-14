const {Base} = require('../../../../../base')
const hash = require('object-hash')
class Fingerprint extends Base {
  constructor({object, config}) {
    super(config)
    this.object = object
    const {name, title} = object
    this.name = name
    this.title = title
    this.properties = object.properties
  }

  get propsObj() {
    const names = Object.keys(this.properties)
    const types = names.map(name => this.properties[name].type)
    return {names, types}
  }

  get propNames() {
    return Object.keys(this.properties)
  }

  get fingerPrintObj() {
    // ownerName: this.owner.name, key: this.key
    return {propsObj: this.propsObj, name: this.name, title: this.title}
  }

  get hash() {
    return hash(this.fingerPrintObj)
  }
}

module.exports = {
  Fingerprint
}
