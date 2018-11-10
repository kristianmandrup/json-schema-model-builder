const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/person.schema.json",
  title: "Person",
  description: "A person",
  type: "object",
  graphql: {
    decorators: {
      client: true
    }
  },
  properties: {
    id: {
      type: "string",
      generated: true,
      unique: true,
      required: true
    },
    name: {
      description: "Name of the person",
      type: "string",
      graphql: {
        decorators: {
          connection: {
            name: "UserNames"
          }
        }
      }
    },
    age: {
      description: "Age of person",
      type: "integer",
      required: true
    },
    money: {
      description: "Money in pocket",
      type: "number"
    },
    accounts: {
      description: "Bank accounts",
      type: "array",
      items: {
        $ref: "#/definitions/account"
      }
    },
    numberOfChildren: {
      description: "Children parented",
      type: "array",
      items: {
        type: "number",
        enum: [0, 1, 2]
      }
    },
    favoriteCoulor: {
      description: "Colors liked",
      name: "color",
      type: "string",
      enum: ["red", "green", "blue"]
    },
    car: {
      description: "Car owned",
      type: "object",
      decorators: {
        client: true
      },
      properties: {
        name: {
          type: "string"
        }
      }
    }
  },
  definitions: {
    account: {
      description: "Bank account",
      type: "object",
      decorators: {
        client: true
      },
      properties: {
        id: {
          type: "string",
          generated: true,
          unique: true,
          required: true
        },
        name: {
          description: "Name of the account",
          type: "string"
        },
        money: {
          description: "Money in account",
          type: "number",
          required: true
        },
        type: {
          description: "Account type",
          // should be implicit: "name": "AccountType",
          type: "string",
          enum: ["saving", "credit", 42]
        }
      }
    }
  },
  required: ["name"]
};

module.exports = {
  schema
};
