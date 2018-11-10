const { createBuilder } = require("../builder");
const { schema } = require("../schema");

describe("converts JSON schema to GraphQL types with decorators", () => {
  const builder = createBuilder({ schema }) || {};
  const { built } = builder.build();

  describe("built", () => {
    test("is defined", () => {
      expect(built).toBeDefined();
    });
  });

  describe("properties", () => {
    const { properties } = built;

    test("is defined", () => {
      expect(properties).toBeDefined();
    });

    describe("name prop", () => {
      const { name } = properties;

      test("is a string", () => {
        expect(name.type).toEqual("string");
      });
    });
  });
});
