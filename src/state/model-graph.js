const {Base} = require('../base')
const Graph = require('graph.js/dist/graph.full')
const {isStringType} = require('../utils')

class ModelGraph extends Base {
  constructor(config = {}) {
    super(config = {})
    const {graph} = config
    this.graph = (graph && graph.instance) || this.createGraph(config.graph)
    this.config = config
  }

  createGraph(options = {}) {
    return new Graph()
  }

  addEdge(from, to, value) {
    return this
      .graph
      .ensureEdge(from, to, value)
  }

  addNode(value) {
    this.addOrGetNode(value)
    return this
  }

  addOrGetNode(value) {
    if (!isStringType(value)) {
      this.ensureNode(value)
    }
    const key = value.name || value
    return this.getNode(key)
  }

  hasNode(key) {
    return Boolean(this.graph.hasVertex(key))
  }

  getNode(node) {
    return isStringType(node)
      ? this
        .graph
        .vertexValue(node)
      : node
  }

  hasEdge(fromNode, toNode) {
    fromNode = this.getNode(fromNode)
    toNode = this.getNode(toNode)
    const hasIt = this
      .graph
      .hasEdge(fromNode, toNode)
    return Boolean(hasIt)
  }

  getEdge(fromNode, toNode) {
    return this
      .graph
      .edgeValue(fromNode, toNode)
  }

  ensureNode(key, value) {
    if (!isStringType(key)) {
      value = key
      key = key.name
    }
    this
      .graph
      .ensureVertex(key, value)
    return this
  }
}

module.exports = {
  ModelGraph
}
