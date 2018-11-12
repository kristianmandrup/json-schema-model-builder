const { JoinTableDecorator } = require("./join-table");
const data = require("./data");

const { nodes, joinEdges, oneToOneEdges, oneToManyEdges } = data;

describe("JoinTableDecorator", () => {
  const config = {};

  describe("No relation", () => {
    const model = {};
    const joinTableDec = new JoinTableDecorator({ model, config });

    test("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("One to one", () => {
    const model = {
      edges: oneToOneEdges,
      node: nodes.A
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    test("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("One to many", () => {
    const model = {
      edges: oneToManyEdges,
      node: nodes.A
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    test("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("Many to many edges", () => {
    const model = {
      edges: joinEdges,
      node: nodes.join
    };
    const joinTableDec = new JoinTableDecorator({ model, config });

    test("isJoinTable: true", () => {
      expect(joinTableDec.isJoinTable).toBe(true);
    });
  });
});
