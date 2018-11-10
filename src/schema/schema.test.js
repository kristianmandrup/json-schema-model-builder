const { createSchema } = require("./schema");
const { schemas } = require("./data");

const built = {
  enums: {},
  types: {}
};

const defaults = {
  config: {
    built
  }
};

// crazy stuff to allow various ways to initialize, by string lookup in schemas
// map etc.
const create = (obj, config) => {
  const $schema = typeof obj === "string" ? schemas[obj] : obj.schema;
  const $config = config || obj.config || defaults.config;
  typeof $schema === "string" ? schemas[schema] : $schema;
  return createSchema({ schema: $schema, config: $config });
};

const resolve = (obj, config) => {
  return create(obj, config).resolve();
};

describe("Schema", () => {
  describe.only("valid children schema", () => {
    const resolved = resolve("validChildren", { grouped: true });
    const { properties } = resolved;
    // const { enums, types } = resolved.properties;
    const keys = Object.keys(resolved);

    test("it resolves schema", () => {
      expect(resolved).toBeTruthy();
    });
  });

  // describe.only("valid schema", () => {
  // const resolved = resolve("valid", { grouped: true });
  // const { properties } = resolved;
  // // const { enums, types } = resolved.properties;
  // const keys = Object.keys(resolved);
  // console.log({ keys, properties });

  // test("resolved has multiple keys", () => {
  //   expect(keys.length).toBeGreaterThan(0);
  // });

  // describe.skip("enums", () => {
  //   const keys = Object.keys(enums);

  //   test("enums has multiple keys", () => {
  //     expect(keys.length).toBeGreaterThan(0);
  //   });

  //   test("has Color enum", () => {
  //     expect(enums.Color).toBeTruthy();
  //   });

  //   test("has ChildCount enum", () => {
  //     expect(enums.ChildCount).toBeTruthy();
  //   });
  // });
  // });

  // describe.skip("valid schema", () => {
  //   const resolved = resolve("valid");
  //   const { enums, types } = resolved;

  //   describe("types", () => {
  //     const keys = Object.keys(enums);

  //     test("has Person type", () => {
  //       expect(types.Person).toBeTruthy();
  //     });

  //     test("has Account type", () => {
  //       expect(types.Account).toBeTruthy();
  //     });

  //     test("has Car type", () => {
  //       expect(types.Car).toBeTruthy();
  //     });
  //   });
  // });
});
