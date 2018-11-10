const { ColumnDecorator } = require("./column");

function createPrimaryColumnDecorator({ model, config }) {
  return new PrimaryColumnDecorator({ model, config });
}

class PrimaryColumnDecorator extends ColumnDecorator {
  constructor({ model, config }) {
    super({ model, config });
  }

  get generated() {
    return this.model.generated;
  }

  get name() {
    return this.generated ? "PrimaryColumn" : "PrimaryGeneratedColumn";
  }

  get args() {
    return [];
  }
}

module.exports = {
  ColumnPrimaryDecorator,
  createColumnPrimaryDecorator
};
