const { createSchema } = require("../schema/schema");
const { createState } = require("../state/");
const { Base } = require("../base");

const createBuilder = ({ state, schema, config }) => {
  return new Builder({ state, schema, config });
};

class Builder extends Base {
  constructor({ state, schema, config }) {
    super(config);
    this.state = state.onEvent ? state : createState({ state, config });
    this.schema = schema || {};
    this.config = config || {};
    this.renderers = config.renderers || {};
    this.renderer = createRenderer({ renderers, built: this.built });
  }

  build() {
    this.built = createSchema({ schema, config }).resolve();
    return this;
  }

  render() {
    this.rendered = this.renderer.render();
    return this;
  }
}

module.exports = {
  createBuilder,
  Builder
};
