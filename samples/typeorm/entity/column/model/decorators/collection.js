const { BaseColumnModel } = require("../base");
const {
  OneToManyDecorator,
  ManyToManyDecorator,
  JoinTableDecorator
} = require("./relationships");

const { ColumnDecorator } = require("./column");
const { PrimaryColumnDecorator } = require("./primary-column");

class DecoratorCollection extends BaseColumnModel {
  constructor({ model, config }) {
    super({ model, config });
  }

  get oneToMany() {
    return new OneToManyDecorator({});
  }

  get manyToMany() {
    return new ManyToManyDecorator({});
  }

  get joinTable() {
    return new JoinTableDecorator({});
  }

  get primary() {
    return new ColumnPrimaryDecorator({ model, condig });
  }

  get column() {
    return new ColumnDecorator({ model, condig });
  }
}
module.exports = {
  DecoratorCollection
};
