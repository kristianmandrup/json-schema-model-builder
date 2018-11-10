const { createBuilder } = require("../builder");
const { schema } = require("../schema");

describe.skip("converts JSON schema to GraphQL types with decorators", () => {
  const builder = createBuilder({ schema }) || {};
  const { built } = builder.build();

  describe("Color enum", () => {
    const Color = enums["Color"];

    test("is named Color", () => {
      expect(Color.name).toEqual("Color");
    });

    test("is an enum", () => {
      expect(Color.is).toEqual("enum");
    });

    test("has client decorator", () => {
      expect(Color.decorators).toEqual({ client: true });
    });

    test("has values red, green and blue", () => {
      expect(Color.values.names).toEqual(["red", "green", "blue"]);
    });

    test("pretty prints Color type", () => {
      const pretty = `enum Color {\n  red\n  green\n  blue\n}\n`;
      expect(Color.toString()).toEqual(pretty);
    });
  });
});
