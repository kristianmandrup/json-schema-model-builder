# Relations

We should use an approach similar to [graphGenTypeorm](https://github.com/jjwtay/graphGenTypeorm#important)

```graphql
type Author @Entity {
    id: Int! @PrimaryGeneratedColumn
    name: String! @Column({type: "varchar"})
    books: [Book] @ManyToMany(inverseSide: "authors") @JoinColumn
}

type Book @Entity {
    id: Int! @PrimaryGeneratedColumn
    title: String! @Column({type: "varchar"})
    description: String @Column({type: "varchar"})
    authors: [Author] @ManyToMany(inverseSide: "books")
    publisher: Publisher @ManyToOne(inverseSide: "books")
}

type Publisher @Entity {
    id: Int! @PrimaryGeneratedColumn
    name: String! @Column({type: "varchar"})
    books: @OneToMany(inverseSide: "publisher")
}
```

But instead define these decorators in the JSON schema entries:

```js
{
  name: 'Book',
  entity: true,
  properties {
    id: {
      type: 'string',
      primary: true,
      generated: true,
      column: true
    },
    title: {
      type: 'string',
      column: {
        type: 'varchar',
      }
    },
    authors: {
      type: 'array'
      items: [{
        typeName: 'Author'
      }],
      manyToMany: {
        typeName: 'Author'
        inverseSide: "books"
      }
    },
    publisher: {
      type: 'string', // id ref
      manyToOne: {
        typeName: 'Publisher'
        inverseSide: "books"
      }
    }
  }
}
```

### Columns

See [columns](https://github.com/jjwtay/graphGenTypeorm/blob/master/src/entity.js#L240)

```js
{
  ...type.fields[fieldName].directives,
  primary: isPrimary(fieldName, type),
  type: getType(type.fields[fieldName]),
  generated: isGenerated(fieldName, type),
  nullable: isNullable(fieldName, type)
}
```

### Relations

See [relations](https://github.com/jjwtay/graphGenTypeorm/blob/master/src/entity.js#L255)

```js
{
  joinTable: type.fields[fieldName].directives[consts.JOIN_COLUMN] ? true : false,
  target: type.fields[fieldName].type,
  cascade: type.fields[fieldName].directives[consts.JOIN_COLUMN] ? true : false,
  type: relType,
  inverseSide: inverseSide,
  lazy: true,
}
```

## Many-to-Many relation

Resources:

- [Many to Many](./ManyToMany.md)
- [video](https://www.youtube.com/watch?v=RH_es0awU_A)

Create a simple join table between `Post` and `User` called `Vote`

```js
import User from './User'

class Post {

  @ManyToMany(()) => User)
  @JoinTable({name: 'Vote'})
  users: User[];
}
```

```js
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  name: "Question", // @Entity
  type: "object",
  typeorm: {
    decorators: {
      entity: true
    }
  },
  properties: {
    // @PrimaryGeneratedColumn()
    id: {
      type: "string",
      generated: true, // generated
      unique: true, // primary
      required: true
    },
    // @Column()
    title: {
      type: "string"
    },
    // @Column()
    value: {
      type: "integer"
    },
    // @ManyToMany(type => Category, category => category.questions, {cascade: true})
    categories: {
      type: "array",
      relationship: {
        kind: "ManyToMany",
        type: "Category", // which table to (Question.categories => Category)
        back: "questions", // property back to this table (Category.questions => Question)
        options: {
          cascade: true
        }
      }
    }
  }
};
```

We can also use JSON schema directly, by use of `$ref` and definitions?

### Question schema

```js
// question.json
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  name: "Question", // @Entity
  type: "object",
  db: {
    entity: true
  },
  properties: {
    // @PrimaryGeneratedColumn()
    id: {
      type: "string",
      generated: true, // generated
      unique: true, // primary
      required: true
    },
    // @Column()
    title: {
      type: "string"
    },
    // @Column()
    value: {
      type: "integer"
    },
    // @ManyToMany(type => Category)

    // For more granular control, set which property should refer back
    // @ManyToMany(type => Category), category => category.questions, {cascade: true}
    categories: {
      type: "array",
      db: {
        relationship: {
          kind: "many",
          type: "Category",
          backRef: "questions", // implicit name (using pluralize) here set explicitly
          cascade: true
        },
      }
      $ref: "#/definitions/Category" // create QuestionCategory join table implicitly
    }
  }
};
```

### Category

```js
// category
definitions: {
  Category: {
    name: "Category", // @Entity
    type: "object",
    db: {
      entity: true
    },
    properties: {
      // @PrimaryGeneratedColumn()
      id: {
        type: "string",
        generated: true, // generated
        unique: true, // primary
        required: true
      },
      // @Column()
      title: {
        type: "string"
        db: { // explicit column
          column: true
        }
      }
    }
  }
};
```

## One-to-Many relation

TODO
