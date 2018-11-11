const { createPrimaryColumnDecorator } = require("./collection");

const config = {};

describe("createPrimaryColumnDecorator", () => {
  describe("not generated", () => {
    model = {
      generated: false
    };

    decorator = createPrimaryColumnDecorator(model, config);

    test("name", () => {
      expect(decorator.name).toEqual("PrimaryColumn");
    });
  });

  describe("generated", () => {
    model = {
      generated: true
    };

    decorator = createPrimaryColumnDecorator(model, config);

    test("name", () => {
      expect(decorator.name).toEqual("PrimaryGeneratedColumn");
    });
  });
});
