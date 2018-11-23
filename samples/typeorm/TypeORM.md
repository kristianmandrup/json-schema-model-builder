# TypeORM

Derive TypeORM schemas (or relational ORM schemas in general) from JSON schema.

## Resources

- [TypeORML Many-to-many relations](https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md)
- [graphGenTypeorm: generateTypeORM from GraphQL type definitions](https://github.com/jjwtay/graphGenTypeorm)

Please look at these resources. Use the `graphGenTypeorm` approach, creating a JS structure that can be fed directly into typeorm to create an entity schema.

Use an approach similar to:

- [graphschematojson](https://github.com/kristianmandrup/graphSchemaToJson)

Create gateway library that can act as gateway to take the JSON schema model output and transform to a TypeORM definition.

## Relationships

- Many to many
- One to many

See [Relations](./Relations.md)

### Example

Ideal source code export:

```js
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "int" })
  value: number;

  @ManyToMany(type => Category, category => category.questions, {
    cascade: true
  })
  @JoinTable() // required/implicit for M-M
  categories: Category[];
}
```
