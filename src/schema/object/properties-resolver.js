const { Base } = require("../../base");
const { createPropertyEntityResolver } = require("./property/property-entity");

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

    return this.resolved;
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
    const transformedEntity = this.transformEntity(entity);
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
