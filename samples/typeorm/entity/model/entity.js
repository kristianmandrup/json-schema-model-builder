const { BaseEntityModel } = require("./base");

function createEntityModel({ model, config }) {
  return new EntityModel({ model, config });
}

class EntityModel {
  constructor({ shape, config }) {
    super({ shape, config });
  }

  get isEntity() {
    return this.db.entity;
  }

  get decorators() {
    [this.entityDecorator];
  }

  get entityDecorator() {
    return this.isEntity && "entity";
  }

  get className() {
    return shape.resolvedTypeName;
  }
}

module.exports = {
  EntityModel,
  createEntityModel
};
