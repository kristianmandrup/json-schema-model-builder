const { Base } = require("../base");

class EnumRenderer extends Base {
  constructor({ model, config }) {
    super(config);
    this.model = model;
    this.key = model.key;
    this.values = model.value;
  }

  toEnum() {
    return `enum ${this.key} {\n  ${this.toEnumList()}\n}\n`;
  }

  toEnumList() {
    return this.values.join("\n  ");
  }
}

module.exports = {
  EnumRenderer
};
