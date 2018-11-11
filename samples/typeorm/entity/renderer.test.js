const { createEntityRenderer } = require("./renderer");

describe("createEntityRenderer", () => {
  describe("empty model", () => {
    const model = {};
    const config = {};

    const entityRenderer = createEntityRenderer({ model, config });

    test("created", () => {
      expect(entityRenderer).toBeDefined();
    });

    describe("columns", () => {
      const { columns } = entityRenderer;

      test("is not defined", () => {
        expect(columns).not.toBeDefined();
      });
    });

    describe("render", () => {
      const rendered = entityRenderer.render();
      console.log(rendered);

      test("Has import", () => {
        expect(rendered).toMatch(/import {/);
        expect(rendered).toMatch(/from "typeorm";/);
      });

      test("Has @Entity decorator", () => {
        expect(rendered).toMatch(/@Entity\(\)/);
      });

      test("Unknown class name", () => {
        expect(rendered).toMatch(/class Unknown/);
      });
    });
  });

  describe("one id column", () => {
    const id = {
      type: "id"
    };
    const model = {
      className: "Person",
      columns: {
        id
      }
    };
    const config = {};

    const entityRenderer = createEntityRenderer({ model, config });

    test("created", () => {
      expect(entityRenderer).toBeDefined();
    });

    describe("Person entity", () => {
      describe("columns", () => {
        const { columns } = entityRenderer;

        test("is defined", () => {
          expect(columns).toBeDefined();
        });

        test("has id key", () => {
          expect(columns.id).toBeDefined();
        });

        test("id column matches column", () => {
          expect(columns.id).toBe(id);
        });
      });

      describe("render", () => {
        const rendered = entityRenderer.render();
        console.log(rendered);

        describe("entity", () => {
          test("Has @Entity decorator", () => {
            expect(rendered).toMatch(/@Entity\(\)/);
          });

          test("Person", () => {
            expect(rendered).toMatch(/class Person/);
          });

          describe("columns", () => {
            test("primary generated column", () => {
              expect(rendered).toMatch(/@PrimaryGeneratedColumn\(\)/);
            });
            test("id string column", () => {
              expect(rendered).toMatch(/id: string/);
            });
          });
        });
      });
    });

    describe("string, int and float columns", () => {
      const level = {
        type: "int"
      };
      const amount = {
        type: "float"
      };
      const name = {
        type: "string"
      };

      const model = {
        className: "Person",
        columns: {
          name,
          level,
          amount
        }
      };
      const config = {};

      const entityRenderer = createEntityRenderer({ model, config });

      describe("render", () => {
        const rendered = entityRenderer.render();
        console.log(rendered);

        describe("entity", () => {
          describe("columns", () => {
            test("no primary generated column", () => {
              expect(rendered).not.toMatch(/@PrimaryGeneratedColumn\(\)/);
            });

            test("name string column", () => {
              expect(rendered).toMatch(/name: String/);
            });

            test("level int/number column", () => {
              expect(rendered).toMatch(/@Column("int")/);
              expect(rendered).toMatch(/level: number/);
            });

            test("level double/number column", () => {
              expect(rendered).toMatch(/@Column("double")/);
              expect(rendered).toMatch(/amount: number/);
            });
          });
        });
      });

      describe("one-to-many column", () => {});

      describe("many-to-many column", () => {});
    });
  });
});
