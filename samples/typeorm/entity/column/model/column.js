const decorators = require("./decorators");

function createColumnModel({ shape, config }) {
  return new ColumnModel({ shape, config });
}

class ColumnModel {
  constructor({ shape = {}, config = {} }) {
    this.shape = shape;
    this.config = config;
    const { value } = shape;
    this.value = value || {};
    this.db = value.db || {};
    this.decorators = value.decorators;
  }

  resolveDecorators() {
    console.log({ api: decorators, decorators });
  }

  validate() {
    return true;
  }

  // TRY: always except if explicitly false
  get isColumn() {
    return this.db.column !== false;
  }

  get isPrimary() {
    if (!isValidPrimaryType) return;
    return this.db.primary || (this.value.generate && this.value.unique);
  }

  get isValidPrimaryType() {
    return (
      ["string", "number", "integer"].indexOf(this.value.expandedType) >= 0
    );
  }
}
module.exports = {
  ColumnModel,
  createColumnModel
};
