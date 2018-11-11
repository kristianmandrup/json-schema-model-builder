const { ColumnDecoratorRenderer } = require("./renderer");

describe("Column renderer", () => {
  const config = {};
  const decorator = {
    name: "Column",
    args: ["int"]
  };
  const renderer = new ColumnDecoratorRenderer({ decorator, config });

  describe("decorators", () => {
    const renderer = renderer.render();
    test("no primary generated column", () => {
      expect(rendered).not.toMatch(/@PrimaryGeneratedColumn\(\)/);
    });

    test("level int/number column", () => {
      expect(rendered).toMatch(/@Column("int")/);
    });

    test("level double/number column", () => {
      expect(rendered).toMatch(/@Column("double")/);
    });
  });
});
