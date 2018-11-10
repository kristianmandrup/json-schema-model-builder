const { createEntityRenderer } = require("./renderer");

describe("createEntityRenderer", () => {
  const model = {};
  const config = {};

  const entityRenderer = createEntityRenderer({ model, config });

  test("created", () => {
    expect(entityRenderer).toBeDefined();
  });

  test("render", () => {
    const rendered = entityRenderer.render();
    expect(rendered).toBeTruthy();
  });
});
