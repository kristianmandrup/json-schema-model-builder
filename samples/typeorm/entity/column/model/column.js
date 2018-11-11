const { Base } = require("./base");
const decorators = require("./decorators");

function createColumnModel({ shape, config }) {
  return new ColumnModel({ shape, config });
}

class ColumnModel extends Base {
  constructor(props) {
    super(props);
    const { config, column } = this.props;
    this.config = config;
    this.column = column || {};
    this.decorators = value.decorators;
  }

  resolveDecorators() {
    console.log({ api: decorators, decorators });
  }

  validate() {
    return true;
  }

  get primary() {
    return this.column.primary;
  }

  // TRY: always except if explicitly false
  get isColumn() {
    return this.column !== false;
  }

  get isPrimary() {
    if (!isValidPrimaryType) return;
    return this.primary || (this.generate && this.unique);
  }

  get generate() {
    return this.column.generate;
  }

  get type() {
    return this.column.unique;
  }

  get type() {
    return this.column.type;
  }

  get isValidPrimaryType() {
    return ["string", "number", "integer"].indexOf(this.type) >= 0;
  }
}
module.exports = {
  ColumnModel,
  createColumnModel
};
