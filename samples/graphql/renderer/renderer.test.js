const { Renderer, createRenderer } = require("./renderer");

describe("Renderer", () => {
  const renderers = {};
  const built = {};
  const config = {};

  const renderer = createRenderer({ renderers, built, config });

  describe("renderer", () => {
    expect(renderer).toBeDefined();
  });

  describe("float", () => {});

  describe("integer", () => {});

  describe("string", () => {});

  describe("enum", () => {});

  describe("type", () => {});

  describe("unknown", () => {});
});
