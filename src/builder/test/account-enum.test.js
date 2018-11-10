const { createBuilder } = require("../builder");
const { schema } = require("../schema");

describe.skip("converts JSON schema to GraphQL types with decorators", () => {
  const builder = createBuilder({ schema }) || {};
  const { built } = builder.build();

  describe("AccountType enum", () => {
    const AccountType = enums["AccountType"];

    test("is named AccountType", () => {
      expect(AccountType.name).toEqual("AccountType");
    });

    test("is an enum", () => {
      expect(AccountType.is).toEqual("enum");
    });

    test("has values red, green and blue", () => {
      expect(AccountType.values.names).toEqual(["saving", "credit"]);
    });

    test("pretty prints AccountType type", () => {
      const pretty = `enum AccountType {\n  saving\n  credit\n}\n`;
      expect(AccountType.toString()).toEqual(pretty);
    });
  });
});
