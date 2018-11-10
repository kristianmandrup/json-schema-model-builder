const { createBuilder } = require("../builder");
const { schema } = require("../schema");

describe.skip("converts JSON schema to GraphQL types with decorators", () => {
  const builder = createBuilder({ schema }) || {};
  const { built } = builder.build();

  describe("PersonCar type", () => {
    const Car = types["PersonCar"];

    test("is named Account", () => {
      expect(Car.name).toEqual("PersonCar");
    });

    test("is an enum", () => {
      expect(Car.is).toEqual("type");
    });

    test("has an name property of type String", () => {
      expect(Car.props.name.is).toEqual("primitive");
      expect(Car.props.name.type.toString()).toEqual("String");
    });

    test("pretty prints PersonCar type", () => {
      const pretty = `type PersonCar {\n  name: String!\n}\n`;
      expect(Car.toString()).toEqual(pretty);
    });
  });
});
