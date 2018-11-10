const { createBuilder } = require("../builder");
const { schema } = require("../schema");

describe.skip("converts JSON schema to GraphQL types with decorators", () => {
  const builder = createBuilder({ schema }) || {};
  const { built } = builder.build();

  describe("Account type", () => {
    const Account = types["Account"];

    test("is named Account", () => {
      expect(Account.name).toEqual("Account");
    });

    test("has an id property of type ID", () => {
      expect(Account.props.id.is).toEqual("primitive");
      expect(Account.props.id.type).toEqual("ID");
    });

    test("has an name property of type String", () => {
      expect(Account.props.name.is).toEqual("primitive");
      expect(Account.props.name.type).toEqual("String");
    });

    test("has an money property of type Float", () => {
      expect(Account.props.money.is).toEqual("primitive");
      expect(Account.props.money.type).toEqual("Float");
    });

    test("has an inline type enum of type AccountType", () => {
      expect(Account.props.type.is).toEqual("enum");
      expect(Account.props.type.type).toEqual("AccountType");
      expect(Account.props.type.required).toBe(true);
    });

    test("pretty prints Account type", () => {
      const pretty = `type Account {\n  id: ID!\n  name: String!\n  money: Float\n  type: AccountType\n}\n`;
      expect(Account.toString()).toEqual(pretty);
    });
  });
});
