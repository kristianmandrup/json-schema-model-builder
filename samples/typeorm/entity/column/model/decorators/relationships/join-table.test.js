const { JoinTableDecorator } = require("./join-table");

describe("JoinTableDecorator", () => {
  const model = {};
  const config = {};
  const joinTableDec = new JoinTableDecorator({ model, config });

  describe("One to many", () => {
    describe("isJoinTable: false", () => {
      expect(joinTableDec.isJoinTable).toBe(false);
    });
  });

  describe("Many to many", () => {
    describe("isJoinTable: true", () => {
      expect(joinTableDec.isJoinTable).toBe(true);
    });
  });
});
