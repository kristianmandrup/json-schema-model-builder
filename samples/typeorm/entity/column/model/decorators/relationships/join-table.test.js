const { JoinTableDecorator } = require("./join-table");
const data = require("./data");

const { joinEdges, oneToOneEdges, oneToManyEdges } = data;

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
      edges: oneToOneEdges
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("One to many", () => {
    const model = {
      edges: oneToManyEdges
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("Many to many edges", () => {
    const model = {
      edges: joinEdges
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    describe("isJoinTable: true", () => {
      expect(joinTableDec.isJoinTable).toBe(true);
    });
  });
});
