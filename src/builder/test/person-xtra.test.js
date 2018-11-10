const { createBuilder } = require("../builder");
const { schema } = require("../schema");

describe.skip("converts JSON schema to GraphQL types with decorators", () => {
  const builder = createBuilder({ schema }) || {};
  const { built } = builder.build();

  describe("built", () => {
    test("is defined", () => {
      expect(built).toBeDefined();
    });
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
