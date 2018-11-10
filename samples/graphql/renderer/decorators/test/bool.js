const { Decorators } = require("./decorators");

const config = {
  targets: {
    prisma: true
  }
};

describe("Decorators: bool", () => {
  const decorators = {
    unique: true
  };

  const decs = new Decorators(decorators, config);

  test("trimmed", () => {
    expect(decs.trimmed).toEqual("@unique");
  });
});
