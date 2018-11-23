const { Base } = require("../../base");
const {
  createPropertyEntityResolver
} = require("./property/property-entity-resolver");

const createPropertiesResolver = ({ object, config }) => {
  config.createPropertyEntityResolver =
    config.createPropertyEntityResolver || createPropertyEntityResolver;
  config.createPropertiesResolver =
    config.createPropertiesResolver || createPropertiesResolver;
  const constructors = config.constructors || {};
  const $PropertiesResolver =
    constructors.PropertiesResolver || PropertiesResolver;
  return new $PropertiesResolver({ object, config });
};

class PropertiesResolver extends Base {
  constructor({ object, config }) {
    super(config);
    const { properties, owner } = object;
    this.ownerName = (owner || {}).name;
    this.properties = properties || {};
    this.config = config || {};
    this.createPropertyEntityResolver = config.createPropertyEntityResolver;
    this.validate();
  }

  validate() {
    !this.ownerName &&
      this.error("validate", "object is missing required ownerName entry");
    return true;
  }

  resolve(force = false) {
    this.resolved =
      (this.resolved && !force) ||
      Object.keys(this.properties).reduce(this.reduceProp.bind(this), {});

    this.onResolved(this.resolved);
    return this.resolved;
  }

  onResolved(resolved) {
    const { config } = this;
    if (config.store) {
      this.addResolvedToStore(resolved);
    }
  }

  addResolvedToStore(resolved) {
    this.getStoreContainer(resolved).push(resolved);
  }

  getStoreContainer(resolved) {
    const { store } = this.config;
    const { type } = resolved;
    store[type] = store[type] || {};
    return store[type];
  }

  groupByTypes() {
    const resolvedPropMap = this.resolve();
    const keys = Object.keys(resolvedPropMap);
    this.grouped =
      this.grouped ||
      keys.reduce((acc, keyName) => {
        const entity = resolvedPropMap[keyName];
        const { value } = entity;
        // const propType = entity.type;
        const { type } = value;
        const typeName = type.property;
        const prop = {
          [keyName]: entity
        };
        acc[typeName] = {
          ...acc[typeName],
          ...prop
        };
        return acc;
      }, {});
    return this.grouped;
  }

  reduceProp(acc = {}, key) {
    if (typeof key !== "string") {
      this.error("reduceProp", "Missing or invalid key", key);
    }
    const property = this.prepareProperty(key);
    const propertyEntityResolver = this.createPropertyEntityResolver({
      property,
      config: this.config
    });
    const entity = propertyEntityResolver.resolve();
    const transformEntity = this.config.transformEntity || this.transformEntity;
    const transformedEntity = transformEntity(entity, {
      config: this.config,
      ctx: this
    });
    acc[key] = transformedEntity;
    return acc;
  }

  // override to customize/filter what gets stored in property map for resolved property entity
  transformEntity(entity) {
    return entity;
  }

  prepareProperty(key) {
    if (!key) {
      this.error("prepareProperty", "Missing key", key);
    }
    const property = this.properties[key];
    // prepare property object
    property.ownerName = this.ownerName;
    property.key = key;
    return property;
  }
}

module.exports = {
  createPropertiesResolver,
  PropertiesResolver
};
