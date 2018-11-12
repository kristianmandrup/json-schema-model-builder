class Base {
  constructor(props) {
    this.props = props;
    const { model, config } = props;
    this.model = model;
    this.config = config;
  }
}

module.exports = {
  Base
};
