const { Base } = require("../../../../base");
const { createDefinitionRefResolver } = require("../reference");
const { camelize, isStringType } = require("./utils");

function checkType(property, type) {
  if (typeof property !== "object") {
    throw new Error(
      `checkType: Invalid property. Must be an object, was: ${typeof property}: ${property}`
    );
  }
  return property.type === type;
}
class PropertyError extends Error {}

class $BaseType extends Base {
  constructor({ property, config = {}, opts } = {}) {
    super(config, opts);
    this.opts = opts;
    let { owner, type, format, name, required, key, $ref, refType } = property;
    owner = owner || {};
    this.property = property;
    this.owner = owner;
    this.key = key;
    this.refType = refType === "reference" ? "reference" : "embedded";
    this.name = {
      key: key,
      id: camelize(name || key, { cap: false }),
      owner: owner.name // Person, Car whoever has the property that references this object
    };
    this.type = {
      property: type,
      format: format
    };
    this.required = required;
    this.config = config;
    const { resolveSchema, rootSchema } = config;
    this.resolveSchema = resolveSchema;
    this.rootSchema = rootSchema;
    this.reference = $ref;
  }

  get refResolver() {
    const args = {
      schema: this.rootSchema,
      reference: this.reference
    };
    this._defRef = this._defRef || createDefinitionRefResolver(args);
    return this._defRef;
  }

  apply() {
    this.resolveAndMergeReferenced();
    return this.shouldApply() ? this : false;
  }

  initialize() {
    this.resolveAndMergeReferenced();
    this.extractMeta();
    this.extractDecorators();
  }

  get refObject() {
    return this.reference ? this.refResolver.refObject : {};
  }

  resolveAndMergeReferenced() {
    const remoteObject = this.refObject;
    this.value = {
      ...this.value,
      remoteObject
    };
  }

  extractMeta() {
    this._meta = this.config._meta_ || {};
    this._types = this._meta.types || {};
  }

  extractDecorators() {
    const { namespace } = this.config;
    let { owner, key } = this;
    owner = owner || {};
    this.ownMeta = (namespace ? this.property[namespace] : this.property) || {};
    const ownDecorators = this.ownMeta.decorators;
    const decorators = this.config.decorators || {};
    this.classDecorators = (decorators[owner.name] || {})[key] || {};
    this.propDecorators = decorators[key] || {};
    // merge by precedence: own, class, prop, so own overrides all
    this.decorators = {
      ...this.propDecorators,
      ...this.classDecorators,
      ...ownDecorators
    };
  }

  get sender() {
    return "propertyType";
  }

  onEntity(entity = {}) {
    const event = {
      sender: this.sender,
      payload: {
        ...entity
      }
    };
    this.dispatch(event);
    this.lastSent = event;
  }

  dispatch(payload = {}) {
    const event = {
      sender: this.sender,
      payload: payload
    };

    if (!this.dispatcher) {
      return this.warn("dispatch", "missing dispatcher");
    }

    if (!this.dispatcher.dispatch) {
      return this.error(
        "dispatch",
        "Invalid dispatcher. Missing dispatch method"
      );
    }

    this.dispatcher.dispatch(event);
    this.lastDispatchedEvent = event;
  }

  get valid() {
    return true;
  }

  get shape() {
    return {
      // decorators extracted from value and config
      decorators: this.decorators,
      // the full config
      // config: this.config,
      // the full property received as input
      property: this.property,
      name: {
        property: this.name,
        full: this.fullName
      },
      // custom meta data
      meta: this.meta,
      // various type information
      type: {
        ...this.type,
        refType: this.refType,
        base: this.baseType,
        // string, number, enum, date, ...
        expanded: this.expandedType,
        // primitive, enum or type
        kind: this.kind,
        // ownerName + key
        fullTypeName: this.fullTypeName,
        fullName: this.fullName,
        name: this.fullName,
        resolved: this.resolvedTypeName,
        // for Array or Object
        reference: {
          resolved: this.reference,
          names: this.typeNames,
          name: this.typeName
        }
      },
      valid: Boolean(this.valid),
      required: Boolean(this.required),

      // usually for Array or Object
      collection: Boolean(this.collection),
      list: Boolean(this.list),
      dictionary: Boolean(this.dictionary)
    };
  }
  // to add custom information
  get meta() {
    return {};
  }

  // by default just the property type override for each type resolver, such as
  // enum, date etc
  get expandedType() {
    return this.type.property;
  }

  get kind() {
    return "primitive";
  }

  get defaultType() {
    return "any";
  }

  get baseType() {
    return this.defaultType;
  }

  // used for embedded objects if otherwise unable to determine a good type name
  get fullTypeName() {
    const name = this.isMultiPath
      ? this.pathNames.join(this.separator.type)
      : this.key;
    return name
      ? camelize(name)
      : // when an array item type
        undefined;
  }

  get fullName() {
    return this.isMultiPath
      ? this.pathNames.join(this.separator.name)
      : this.key;
  }

  get isMultiPath() {
    return this.pathNames.length > 1;
  }

  get pathNames() {
    return [this.owner.name, this.key].filter(item => !!item);
  }

  get separator() {
    return { name: "_", type: "_" };
  }

  hasTypeNames() {
    return this.typeNames && this.typeNames.length > 0;
  }

  get typeNames() {
    return [];
  }

  get typeName() {
    return this.objTypeName || this.remoteTypeName;
  }

  get remoteTypeName() {
    return this.reference && this.refResolver.typeName;
  }

  get resolvedTypeName() {
    return this.typeName || this.baseType;
  }

  get collection() {
    return false;
  }

  get list() {
    return false;
  }

  get dictionary() {
    return false;
  }

  get configType() {
    return this._types[this.name];
  }

  get overrideType() {
    return this.configType || this._specialType;
  }

  traverseNested() {
    return this;
  }

  error(name, msg, value) {
    if (!isStringType(name)) {
      throw new Error(
        "error",
        `must take name string as first argument, was: ${typeof name}`
      );
    }
    name = [this.key, this.type, name].join("::");
    super.error(name, msg, value);
  }
}

class BaseType extends $BaseType {
  constructor(property, config) {
    super(property, config);
    this.initialize();
  }
}

module.exports = {
  checkType,
  $BaseType,
  BaseType,
  PropertyError
};
