const { BaseColumnModel } = require("../base");
const {
  OneToManyDecorator,
  ManyToManyDecorator,
  JoinTableDecorator
} = require("./relationships");

const { ColumnDecorator } = require("./column");
const { PrimaryColumnDecorator } = require("./primary-column");

class DecoratorCollection extends BaseColumnModel {
  constructor(props) {
    super(props);
  }

  get oneToMany() {
    return new OneToManyDecorator(this.props);
  }

  get manyToMany() {
    return new ManyToManyDecorator(this.props);
  }

  get joinTable() {
    return new JoinTableDecorator(this.props);
  }

  get primary() {
    return new PrimaryColumnDecorator(this.props);
  }

  get column() {
    return new ColumnDecorator(this.props);
  }
}
module.exports = {
  DecoratorCollection
};
