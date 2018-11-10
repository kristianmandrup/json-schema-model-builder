const { createEntityModel } = require("./model");

describe("createEntityModel", () => {
  const model = {};
  const config = {};

  const entityModel = createEntityModel({ model, config });

  test("created", () => {
    expect(entityModel).toBeDefined();
  });

  test("isEntity", () => {
    expect(entityModel.isEntity).toBeTruthy();
  });
});
