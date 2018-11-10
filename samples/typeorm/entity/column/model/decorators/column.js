class ColumnDecorator {
  constructor({ model, config }) {
    this.model = model;
    this.config = config;
    this.generated = generated;
  }

  get generated() {
    return this.model.generated;
  }

  get name() {
    return "Column";
  }

  get args() {
    return [];
  }
}

class ColumnPrimaryDecorator extends ColumnDecorator {}

module.exports = {
  ColumnDecorator,
  ColumnPrimaryDecorator
};
