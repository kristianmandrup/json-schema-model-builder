const { State } = require("./state");
const { colors, person, car, union } = require("./data");
const { log } = console;

describe("State", () => {
  const state = new State();

  describe("initial state", () => {
    test("enums", () => {
      expect(state.enums).toEqual({});
    });

    test("unions", () => {
      expect(state.unions).toEqual({});
    });

    test("types", () => {
      expect(state.types).toEqual({});
    });
  });
});

describe("State", () => {
  const state = new State();
  describe("enum", () => {
    describe("add", () => {
      state.add(colors);
      const { name } = colors;
      // console.log("add", { colors, name, collections: state.collections });

      test("added to enum map", () => {
        expect(state.has(name, "enum")).toBe(true);
      });
      test("not added to type map", () => {
        expect(state.has(name, "type")).toBe(false);
      });
    });
  });

  describe("type", () => {
    describe("add", () => {
      state.add(person);
      test("added to map", () => {
        expect(state.has(person.name, "type")).toBe(true);
      });
    });
  });

  describe("union", () => {
    state.add(union, "union");
    describe("add", () => {
      test("added to map", () => {
        expect(state.has(union.name, "union")).toBe(true);
      });
    });
  });
});
