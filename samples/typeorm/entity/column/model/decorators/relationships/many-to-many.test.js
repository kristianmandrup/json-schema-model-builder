const { ManyToManyDecorator } = require("./many-to-many");

describe("ManyToManyDecorator", () => {
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
    const ManyToManyDec = new ManyToManyDecorator({ model, config });

    describe("isManyToMany: false", () => {
      expect(ManyToManyDec.isManyToMany).toBe(false);
    });
  });

  describe("One to one", () => {
    const model = {
      targets: target
    };
    const ManyToManyDec = new ManyToManyDecorator({ model, config });

    describe("isManyToMany: false", () => {
      expect(ManyToManyDec.isManyToMany).toBe(false);
    });
  });

  describe("One to many", () => {
    const model = {
      targets
    };
    const ManyToManyDec = new ManyToManyDecorator({ model, config });

    describe("isManyToMany: false", () => {
      expect(ManyToManyDec.isManyToMany).toBe(false);
    });
  });

  describe("reverse targets not pointing back to self", () => {
    const model = {
      name: "Blip",
      targets: reverseTargets
    };
    const ManyToManyDec = new ManyToManyDecorator({ model, config });

    describe("isManyToMany: true", () => {
      expect(ManyToManyDec.isManyToMany).toBe(false);
    });
  });

  describe("Many to many - reverse target pointing back to self", () => {
    const model = {
      name: "Person",
      targets: reverseTargets
    };
    const ManyToManyDec = new ManyToManyDecorator({ model, config });

    describe("isManyToMany: true", () => {
      expect(ManyToManyDec.isManyToMany).toBe(true);
    });
  });
});
