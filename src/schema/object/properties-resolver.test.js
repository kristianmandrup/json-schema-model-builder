const { createPropertiesResolver } = require("./properties-resolver");
const { schemas } = require("../data");

const { property } = require("./property");
const { createPropertyEntityResolver } = property;

const create = ({ object, config = {} }) => {
  config.createPropertyEntityResolver = createPropertyEntityResolver;
  return createPropertiesResolver({ object, config });
};

const config = {};

describe("PropertiesResolver", () => {
  const object = schemas.valid;
  object.owner = {};
  describe("validate", () => {
    test("missing ownerName - error", () => {
      try {
        object.owner.name = undefined;
        create({ object, config });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    test("has ownerName - no error", () => {
      try {
        object.owner.name = "person";
        const created = create({ object, config });
        expect(created).toBeDefined();
      } catch (err) {
        expect(err).toBeUnDefined();
      }
    });
  });

  describe("resolve", () => {
    object.owner.name = "person";
    const created = create({ object, config });
    const resolved = created.resolve();

    // TODO: test what is resolved
    test("resolves to object", () => {
      expect(typeof resolved).toEqual("object");
    });

    test("age entry is a primitive entity", () => {
      expect(resolved.age.type.kind).toEqual("primitive");
    });
  });

  describe("groupByTypes", () => {
    object.owner.name = "person";
    const created = create({ object, config });
    const grouped = created.groupByTypes();
    test("created grouped type map by entity type", () => {
      expect(typeof grouped).toEqual("object");
    });

    test("object group has a car entry", () => {
      expect(typeof grouped.object).toEqual("object");
      expect(grouped.object.car).toBeDefined();
    });

    test("integer group has an age entry", () => {
      expect(typeof grouped.integer).toEqual("object");
      expect(grouped.integer.age).toBeDefined();
    });
  });
});

describe("prepareProperty", () => {
  const properties = {
    age: {
      type: "number"
    }
  };
  const object = {
    owner: {
      name: "person"
    },
    properties
  };
  const created = create({ object, config });
  const prepared = created.prepareProperty("age");

  describe("raw property", () => {
    const raw = properties.age;

    test("has ownerName", () => {
      expect(raw.ownerName).toBeDefined();
    });

    test("has key age", () => {
      expect(raw.key).toBe("age");
    });
  });

  describe("prepared", () => {
    test("is an object", () => {
      expect(typeof prepared).toEqual("object");
    });

    test("has ownerName", () => {
      expect(prepared.ownerName).toEqual("person");
    });

    test("has a key", () => {
      expect(prepared.key).toEqual("age");
    });
  });

  describe("reduceProp", () => {
    const created = create({ object, config });
    const entityMap = created.reduceProp({}, "age");
    const { age } = entityMap;

    describe("entity", () => {
      test("is an object", () => {
        expect(typeof age).toEqual("object");
      });

      test("is a primitive", () => {
        expect(age.type.kind).toEqual("primitive");
      });
    });
  });
});
