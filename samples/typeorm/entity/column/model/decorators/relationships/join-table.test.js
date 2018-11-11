const { JoinTableDecorator } = require("./join-table");
const data = require("./data");

const {
  target,
  targets,
  reverseTargets
  // joinEdges,
  // oneToOneEdges,
  // oneToManyEdges
} = data;

describe("JoinTableDecorator", () => {
  const config = {};

  describe("No relation", () => {
    const model = {};
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("One to one", () => {
    const model = {
      targets: target
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("One to many", () => {
    const model = {
      targets
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("reverse targets not pointing back to self", () => {
    const model = {
      name: "Blip",
      targets: reverseTargets
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: true", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("Many to many - reverse target pointing back to self", () => {
    const model = {
      name: "Person",
      targets: reverseTargets
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: true", () => {
      expect(joinTableDec.isJoinTable).toBe(true);
    });
  });
});
