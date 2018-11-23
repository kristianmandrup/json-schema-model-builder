const { Base } = require("../base");
const { ModelGraph } = require("./model-graph");
const initialCollections = () => ({ enums: {}, types: {}, unions: {} });

const { isStringType } = require("../utils");

const createState = ({ state, config }) => {
  return new State({ state, config });
};

class State extends Base {
  constructor({ state = {}, config = {} } = {}) {
    super(config);
    const collections = state.collections || initialCollections();
    const graph = state.graph;
    this.collections = collections;
    this.graph = graph || this.createModelGraph();
  }

  createModelGraph() {
    return new ModelGraph(this.config);
  }

  onEvent(event) {
    const { sender, payload } = event;
    const { action } = payload || {};
    action ? this.execute({ action, payload }) : this.noAction(event);
  }

  noAction(event) {
    this.log({ event });
    this.warn("onEvent", "event missing action");
  }

  execute({ action, payload }) {
    const method = this[action];
    return method && method(payload);
  }

  get types() {
    return this.collections.types;
  }

  get enums() {
    return this.collections.enums;
  }

  get unions() {
    return this.collections.unions;
  }

  get(key, type = "type") {
    const typeMap = this.mapFor(type);
    return typeMap[key];
  }

  collection(type = "type") {
    return this.mapFor(type);
  }

  mapFor(type = "type") {
    const colName = type + "s";
    if (!this.collections[colName]) {
      this.error(`Invalid map type: ${type}`);
    }
    return this.collections[colName];
  }

  has(value, type = "type") {
    const name = isStringType(value) ? value : value.name;
    type = value.type || type;
    const typeMap = this.mapFor(type);
    const found = typeMap[name];
    return Boolean(found);
  }

  add(obj, type = "type") {
    type = obj.type || obj.$type || type;
    this.ensure(obj, type);
    return this;
  }

  addRef($from, $to, refType = "type") {
    const from = this.addOrGet($from);
    const to = this.addOrGet($to);
    refType = refType || $to.$type;

    // TODO: move to GraphState
    if (!this.graph) return;

    const fromNode = this.graph.addOrGetNode(from);
    const toNode = this.graph.addOrGetNode(to);
    this.graph.addEdge(fromNode, toNode, {
      reference: true,
      refType
    });
  }

  ensure(value, type) {
    type = type || value.$type || value.type;
    const map = this.mapFor(type);
    !map && this.erorr("ensure", `Invalid type ${type}`);
    if (!this.has(value, type)) {
      this.setEntry({ map, value, name: value.name });
    }
    return map[value.name];
  }

  // TODO: also try to add/ensure node in graph
  setEntry({ map, value, name }) {
    map[name] = value;
    return this;
  }
}

module.exports = {
  State,
  createState
};
