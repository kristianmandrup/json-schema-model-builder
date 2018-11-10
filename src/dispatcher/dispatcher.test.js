const { createDispatcher } = require("./dispatcher");

const colors = {
  name: "colors",
  type: "enum",
  values: ["red", "blue"]
};

const person = {
  name: "person",
  type: "type",
  properties: {
    age: 32
  }
};

describe("converts JSON schema to GraphQL types with decorators", () => {
  const dispatcher = createDispatcher({ schema }) || {};

  describe("dispatch colors add enum event", () => {
    const sender = "propertyType";
    const payload = {
      ...colors,
      action: "add"
    };

    const event = {
      sender,
      payload
    };

    dispatcher.dispatch(event);
    const { state } = dispatcher;
    const { collections } = state;

    describe("state", () => {
      test("updated enum collection with event state", () => {
        expect(collections.enums.length).toBeGreaterThan(0);
      });
    });
  });

  describe("dispatch person add type event", () => {
    const sender = "propertyType";
    const payload = {
      ...person,
      action: "add"
    };

    const event = {
      sender,
      payload
    };

    dispatcher.dispatch(event);
    const { state } = dispatcher;
    const { collections } = state;

    describe("state", () => {
      test("updated types collection with event state", () => {
        expect(collections.types.length).toBeGreaterThan(0);
      });
    });
  });
});
