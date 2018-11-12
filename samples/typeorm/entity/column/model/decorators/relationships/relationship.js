const { Base } = require("../base");

class Relationship extends Base {
  constructor(props) {
    super(props);
    let { edges, node } = this.model;
    edges = edges || [];
    node = node || {};
    this.edges = edges;
    this.node = node;
    const { properties } = node;
    this.properties = properties || {};
  }

  get propNames() {
    return Object.keys(this.properties);
  }

  get foreignKeys() {
    return this.propNames.filter(prop => !prop.foreignKey);
  }
}
module.exports = {
  Relationship
};
