const { UnionRenderer, createUnionRenderer } = require("./union");

describe("UnionRenderer", () => {
  const model = {};
  const config = {};

  const renderer = createUnionRenderer({ model, config });

  describe("renderer", () => {
    expect(renderer).toBeDefined();
  });
});
