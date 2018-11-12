const { Relationship } = require("./relationship");

class JoinTableDecorator extends Relationship {
  constructor(props) {
    super(props);
  }

  get use() {
    return this.isJoinTable;
  }

  get name() {
    return "JoinTable";
  }

  get args() {
    return [
      {
        key: "name",
        value: "Vote"
      }
    ];
  }

  get isJoinTable() {
    const key1 = this.foreignKeys[0];
    const key2 = this.foreignKeys[1];
    const prop1 = this.properties[key1];
    const prop2 = this.properties[key2];
    const node1 = prop1 ? (prop1.foreignKey || {}).to : null;
    const node2 = prop2 ? (prop2.foreignKey || {}).to : null;
    const nodeDiff = Boolean(node1 && node2 && node1 !== node2);
    return nodeDiff;
  }
}

module.exports = {
  JoinTableDecorator
};
