const { Base } = require("../base");
const { object } = require("./object");
const { resolveSchema } = object;

const createSchema = ({ schema, config }) => {
  return new Schema({ schema, config });
};

class Schema extends Base {
  constructor({ schema, config }) {
    super(config);
    this.schema = schema;
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
    const state = this.defaultState;
    const config = this.config;
    return createDispatcher({ state, config });
  }

  get defaultState() {
    const config = this.config;
    return createState({ config });
  }
}

const { createDispatcher } = require("../dispatcher");
const { createState } = require("../state");

module.exports = {
  createSchema,
  Schema
};
