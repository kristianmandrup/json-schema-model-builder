const { createBuilder } = require("./builder");
const { schema } = require("./schema");

describe.skip("converts JSON schema to GraphQL types with decorators", () => {
  const result = createBuilder({ schema }) || {};

  describe("Person type", () => {
    const Person = result["Person"];

    test("is defined", () => {
      expect(Person).toBeDefined();
    });

    test("is named Person", () => {
      expect(Person.name).toEqual("Person");
    });

    test("has an id property of type ID", () => {
      expect(Person.props.id.is).toEqual("primitive");
      expect(Person.props.id.type).toEqual("ID");
    });

    test("has an name property of type String", () => {
      expect(Person.props.name.is).toEqual("primitive");
      expect(Person.props.name.type.basic).toEqual("String");
      expect(Person.props.name.type.full).toEqual("String!");
      expect(Person.props.name.type.fullDecorated).toEqual(
        'String! @connection(name: "UserNames")'
      );
      expect(Person.props.name.pretty).toEqual(
        `name: String! @connection(name: "UserNames")`
      );
    });

    test("has an money property of type Float", () => {
      expect(Person.props.money.is).toEqual("primitive");
      expect(Person.props.money.type.basic).toEqual("Float");
      expect(Person.props.money.type.full).toEqual("Float");
      expect(Person.props.money.type.fullDecorated).toEqual("Float");
    });

    test("has an money property of type Float", () => {
      expect(Person.props.age.is).toEqual("primitive");
      expect(Person.props.age.type.basic).toEqual("Int");
      expect(Person.props.age.required).toBe(true);
    });

    test("has an accounts property of type [Account] referencing definition Account", () => {
      expect(Person.props.accounts.is).toEqual("type-ref");
      expect(Person.props.accounts.multiple).toBe(true);
      expect(Person.props.accounts.ref).toBe("reference");
      expect(Person.props.accounts.definition).toBe("account");
      expect(Person.props.accounts.type.basic).toEqual("Account");
      expect(Person.props.accounts.type.full).toEqual("[Account]");
      expect(Person.props.accounts.type.fullDecorated).toEqual("[Account]");
    });

    test("has an numberOfChildren property of type [Int]", () => {
      expect(Person.props.numberOfChildren.is).toEqual("primitive");
      expect(Person.props.numberOfChildren.multiple).toBe(true);
      expect(Person.props.numberOfChildren.type.basic).toEqual("Int");
      expect(Person.props.numberOfChildren.type.full).toEqual("[Int]");
    });

    test("has a car property of type PersonCar", () => {
      expect(Person.props.car.is).toEqual("type-ref");
      expect(Person.props.car.ref).toEqual("embedded");
      expect(Person.props.accounts.multiple).toBeFalsy();
      expect(Person.props.car.type).toEqual("PersonCar");
    });

    test("pretty prints Person type", () => {
      const pretty = `type Person {\n  id: ID!\n  name: String! @connection(name: "UserNames")\n  age: Int!\n  money: Float\n  accounts: [Account]\n}\n`;
      expect(Person.toString()).toEqual(pretty);
    });
  });

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
