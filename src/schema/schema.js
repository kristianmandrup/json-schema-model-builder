const { Base } = require("../base");
const { object } = require("./object");
const { resolveSchema } = object;

const createSchema = ({ schema, config }) => {
  return new Schema({ schema, config });
};

class Schema extends Base {
  constructor({ schema, dispatcher, state, config }) {
    super(config);
    this.schema = schema;
    this.state = state || config.state;
    this.dispatcher = dispatcher || config.dispatcher || this.defaultDispatcher;
    this.properties = schema.properties || {};
  }

  resolve() {
    const config = this.config;
    config.dispatcher = config.dispatcher || this.defaultDispatcher;
    // resolves both properties AND definitions
    return resolveSchema({
      schema: this.schema,
      config: this.config,
      opts: {
        schema: true
      }
    });
  }

  get defaultDispatcher() {
    const state = this.state;
    const config = this.config;
    return createDispatcher({ state, config });
  }

  get defaultState() {
    const config = this.config;
    const state = createState({ config });
    this.graph = state.graph;
    return state;
  }
}

const { createDispatcher } = require("../dispatcher");
const { createState } = require("../state");

module.exports = {
  createSchema,
  Schema
};
