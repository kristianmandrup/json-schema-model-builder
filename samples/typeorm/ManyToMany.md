# Many-to-many relations

See [TypeORML Many-to-many relations](https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md)

Many-to-many is a relation where A contains multiple instances of B, and B contain multiple instances of A.

Let's take for example `Question` and `Category` entities.
Question can have multiple categories, and each category can have multiple questions.

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

```typescript
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

  @Column()
  text: string;

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];
}
```

`@JoinTable()` is required for `@ManyToMany` relations.
You must put `@JoinTable` on one (owning) side of relation.

This example will produce following tables:

```shell
+-------------+--------------+----------------------------+
|                        category                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name        | varchar(255) |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                        question                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| title       | varchar(255) |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                   question_categories                   |
+-------------+--------------+----------------------------+
| questionId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
| categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
+-------------+--------------+----------------------------+
```

Relations can be uni-directional and bi-directional. Uni-directional are relations with a relation decorator only on one side. Bi-directional are relations with decorators on both sides of a relation.

We just created a uni-directional relation. Let's make it bi-directional:

```js
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Question, question => question.categories)
  questions: Question[];
}
```

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

  @Column()
  text: string;

  @ManyToMany(type => Category, category => category.questions)
  @JoinTable()
  categories: Category[];
}
```

We just made our relation bi-directional. Note, the inverse relation does not have a @JoinTable. @JoinTable must be only on one side of the relation.

Bi-directional relations allow you to join relations from both sides using QueryBuilder:

## Many to Many in JSON Schema

### Person

```js
{
  name: 'Person'
  properties: {
    id: {
      type: 'string',
      unique: true,
      generated: true,
      primary: true
    },
    name: {
      type: string
    }
  }
}
```

### Product

```js
{
  name: 'Product'
  properties: {
    id: {
      type: 'string',
      unique: true,
      generated: true,
      primary: true
    },
    name: {
      type: string
    }
  }
}
```

### Rating (Join table)

```js
{
  name: 'Rating'
  properties: {
    id: {
      type: 'string',
      unique: true,
      generated: true,
      primary: true
    },
    // ref to multiple persons
    person: {
      // first one becomes join-table (owning relation)
      owning: true,
      $ref: '#/definitions/Person'
    },
    product: {
      $ref: '#/definitions/Product'
    }
  }
}
```

Alternative, auto-create Join table

```js
{
  name: 'Category'
  properties: {
    id: {
      type: 'string',
      unique: true,
      generated: true,
      primary: true
    },
    questions: {
      relation: {
        type: 'many-to-many',
        // owning: true - auto-generates joinTable (by ORM convention)
        joinTable: 'CategoryQuestion',
        bidirectional: true
      },
      type: 'array',
      items: [{$ref: '#/definitions/Question'}]
    },
  }
},
{
  name: 'Question'
  properties: {
    id: {
      type: 'string',
      unique: true,
      generated: true,
      primary: true
    },
    name: {
      type: string
    },

  }
}
```

````js
{
  name: 'Person'
  properties: {
    id: {
      type: 'string',
      unique: true,
      generated: true,
      primary: true
    },
    questions: {
      relation: {
        type: 'one-to-many'
      },
      type: 'array',
      items: [{$ref: '#/definitions/Question'}]
    },
    accounts: {
      relation: {
        type: 'one-to-many'
      },
      type: 'array',
      items: [{$ref: '#/definitions/Question'}]
    },
  }
},


## Data example

```js
{
  persons: [{
    type: 'Person'
    id: 'person1'
    name: 'Mike'
  }],
  products: [{
    type: 'Product'
    id: 'prod1'
    name: 'Shoe'
  }],
  ratings: [{
    type: 'Rating'
    person: 'person1'
    product: 'prod1'
  }],
}

````

## Translation to TypeORM (relational)

```
Person
  id: primary
  @ManyToMany(type => Rating)
  rating: Rating[]

Product
  id: primary
  @ManyToMany(type => Rating)
  rating: Rating[]

Rating
```
