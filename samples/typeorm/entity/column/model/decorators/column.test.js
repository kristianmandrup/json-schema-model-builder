const { createColumnDecorator } = require("./collection");

const config = {};

describe("createColumnDecorator", () => {
  describe("not generated", () => {
    model = {
      generated: false
    };

    decorator = createColumnDecorator(model, config);

    test("name", () => {
      expect(decorator.name).toEqual("Column");
    });

    test("generated", () => {
      expect(decorator.generated).toBe(false);
    });
  });

  describe("generated", () => {
    model = {
      generated: true
    };

    decorator = createColumnDecorator(model, config);

    test("generated", () => {
      expect(decorator.generated).toBe(true);
    });
  });
});
