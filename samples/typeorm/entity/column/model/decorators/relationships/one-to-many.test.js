const { OneToManyDecorator } = require("./one-to-many");

describe("OneToManyDecorator", () => {
  const config = {};

  const target = [
    {
      name: "Plane"
    }
  ];

  const targets = [
    {
      name: "Plane"
    },
    {
      name: "Car"
    }
  ];

  describe("No relation", () => {
    const model = {};
    const OneToManyDec = new OneToManyDecorator({ model, config });

    describe("isOneToMany: false", () => {
      expect(OneToManyDec.isOneToMany).toBe(false);
    });
  });

  describe("One to one", () => {
    const model = {
      targets: target
    };
    const OneToManyDec = new OneToManyDecorator({ model, config });

    describe("isOneToMany: false", () => {
      expect(OneToManyDec.isOneToMany).toBe(false);
    });
  });

  describe("One to many", () => {
    const model = {
      targets
    };
    const OneToManyDec = new OneToManyDecorator({ model, config });

    describe("isOneToMany: true", () => {
      expect(OneToManyDec.isOneToMany).toBe(true);
    });
  });
});
