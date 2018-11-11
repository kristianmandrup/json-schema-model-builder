const { createEntityRenderer } = require("./renderer");

describe("createEntityRenderer", () => {
  describe("columns", () => {
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
