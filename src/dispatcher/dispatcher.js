const { Base } = require("../base");
const { createState } = require("../state");

const createDispatcher = ({ state, config }) => {
  return new Dispatcher({ state, config });
};

class Dispatcher extends Base {
  constructor({ state, config }) {
    super(config);
    this.state = state || this.defaultState;
    this.config = config;
  }

  get defaultState() {
    return createState({ config: this.config });
  }

  dispatch(event) {
    this.log(event);
    this.state.onEvent(event);
    return this;
  }
}

module.exports = {
  createDispatcher,
  Dispatcher
};
