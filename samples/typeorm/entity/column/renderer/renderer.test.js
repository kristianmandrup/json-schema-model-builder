const { column, decorators } = require("./renderer");
const { ColumnDecoratorRenderer } = decorators;
const { ColumnRenderer } = column;

describe("Column renderer", () => {
  describe("decorators", () => {
    const model = {};
    const columnRenderer = new ColumnDecoratorRenderer({ model });
    const rendered = columnRenderer.render();

    test("no primary generated column", () => {
      expect(rendered).not.toMatch(/@PrimaryGeneratedColumn\(\)/);
    });

    test("name string column", () => {
      expect(rendered).toMatch(/name: String/);
    });

    test("level int/number column", () => {
      expect(rendered).toMatch(/@Column("int")/);
      expect(rendered).toMatch(/level: number/);
    });

    test("level double/number column", () => {
      expect(rendered).toMatch(/@Column("double")/);
      expect(rendered).toMatch(/amount: number/);
    });
  });

  describe("columns", () => {
    const model = {};
    const columnRenderer = new ColumnRenderer({ model });
    const rendered = columnRenderer.render();

    test("no primary generated column", () => {
      expect(rendered).not.toMatch(/@PrimaryGeneratedColumn\(\)/);
    });

    test("name string column", () => {
      expect(rendered).toMatch(/name: String/);
    });

    test("level int/number column", () => {
      expect(rendered).toMatch(/@Column("int")/);
      expect(rendered).toMatch(/level: number/);
    });

    test("level double/number column", () => {
      expect(rendered).toMatch(/@Column("double")/);
      expect(rendered).toMatch(/amount: number/);
    });
  });
});
