class PropType {
  constructor({ overrideType, baseType, isArray, required, decorators }) {
    this.overrideType = overrideType;
    this.baseType = baseType;
    this.isArray = isArray;
    this.required = required;
    this.decoration = decorators ? decorators.pretty : "";
  }

  get shape() {
    return {
      basic: this._simpleType,
      full: this.full,
      fullDecorated: this.fullDecorated
    };
  }

  get full() {
    return this.dataType;
  }

  get fullDecorated() {
    return `${this.dataType}${this.decoration}`.trim();
  }

  get req() {
    return this.required ? "!" : "";
  }

  get dataType() {
    return this._normalizedDataType;
  }

  get _normalizedDataType() {
    return this._dataType.replace("!!", "!");
  }

  get _dataType() {
    return [this.type, this.req].join("");
  }

  get type() {
    return this.isArray ? this._arrayType : this._simpleType;
  }

  get _arrayType() {
    return `[${this.graphQLType}]`;
  }

  get _simpleType() {
    return this.overrideType || this.baseType;
  }

  get graphQLPrimitiveType() {
    const type = this._simpleType;
    this.mapTypeToGraphQL[type.toLowerCase()] || "String";
  }

  mapTypeToGraphQL(type) {
    return {
      id: "ID",
      string: "String",
      int: "Int",
      float: "Float",
      number: "Int",
      bool: "Boolean",
      boolean: "Boolean"
    };
  }
}

module.exports = {
  PropType
};
