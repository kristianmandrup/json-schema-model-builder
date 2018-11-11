function createEntityRenderer({ model, config }) {
  return new EntityRenderer({ model, config });
}

class EntityRenderer {
  constructor({ model = {}, config = {} }) {
    this.model = model;
    this.config = config;
  }

  render() {
    return `
${this.imports}

${this.entityDecorator}
export class ${this.className} {
  ${this.body}
}`;
  }

  get className() {
    return (
      this.model.className || this.model.entity || this.model.type || "Unknown"
    );
  }

  get imports() {
    return this.renderTypeOrmImports;
  }

  get typeImports() {
    return `import { Entity } from '`;
  }

  get renderTypeOrmImports() {
    return `import { ${this.typeOrmImports} } from "typeorm";`;
  }

  get typeOrmImports() {
    return ["Entity"]
      .concat(this.relationshipImports)
      .concat(this.columnImports);
  }

  // TODO
  get relationshipImports() {
    return ["ManyToOne"];
  }

  // TODO
  get columnImports() {
    return ["PrimaryGeneratedColumn", "Column"];
  }

  get entityDecorator() {
    return `@Entity()`;
  }

  get body() {
    return this.columns ? this.columns.render() : "";
  }

  get columns() {
    return this.model.columns;
  }
}

module.exports = {
  EntityRenderer,
  createEntityRenderer
};
