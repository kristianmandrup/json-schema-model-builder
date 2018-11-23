# JSON Schema model builder

Infrastructure components to traverse, build models and cause side effects based on a JSON Schema.

This can be leveraged to build a [Declarative Driven Development](https://github.com/kristianmandrup/decl-driven-dev) framework where you build most of your app from a single source of truth (enriched JSON schemas) and keep it in sync on every update.

## Status

See [Building Blocks](./BuildingBlocks.md) for more details

Please check the tests and markdown `*.md` documentation files for in-depth API documentation (Note: needs update).

## Quick start

- npm: `npm install json-schema-model-builder -S`
- yarn: `yarn add json-schema-model-builder`

## Use

You can use it something like this...

```js
import { schema } from "./schemas/person.json";
import { config } from "./config";
import {
  createBuilder,
  createState,
  createDispatcher
} from "json-schema-model-builder";

const state = createState({ config });
const dispatcher = createDispatcher({ state, config });
const builder = createBuilder({ state, schema, dispatcher, config });
const built = builder.build();
const rendered = built.render();

// Render the darn thing!
console.log({ rendered });
```

Note: The `Builder` and `Renderer` still need some work, but you can leverage and extend their current implementation already.

## Design & Architecture

This project is a result of multiple efforts trying to generate source code or derive models from JSON schemas. There is a need for a framework with a set of well tested, battle-tested building blocks to make this much easier. The goal is to achieve true _declarative model driven development_.

Your domain and action models across your stack should automatically be derived from the same underlying declarative model (project blueprint).

In the near future we will likely add interactive graph driven development to the mix, using an approach like [d3-force-graph-editor](https://github.com/kristianmandrup/d3-force-graph-editor)

You could in the end simply _draw your full application_ as a directed graph and then assign sufficient meta data to nodes and edges. Then as you draw, have an asortment of pluggable generators generate most (if not all!) of the app for you!

As you reconfigure your graph your app would be auto-coded/generated to reflect the graph in real time!!

Ideally you would then sync the state of the graph with other developers in real time, either using something like AppSync or GraphQL backend or perhaps something like [automerge-graph](https://github.com/kristianmandrup/automerge-graph) or [Immer](https://github.com/mweststrate/immer)

### Addional projects/resources

- [react app builder](https://github.com/kristianmandrup/react-app-builder) building React app runtime code from model
- [declaration driven development](https://github.com/kristianmandrup/decl-driven-dev) outlining a full declarative application model

### Main concepts

Infrastructure delivered by library

- `Builder` builds a set of entities identified by resolvers and dispatches events as needed
- `Dispatcher` Dispatches select events to state for update of model
- `State` builds collections of entities and a directed graph from incoming model events

Your concerns for output target

- `Model`: target model to be built from state can either subscribe to the State or process the State when builder has finished
- `Renderer` Rendering can be done when target model has been built

The following examples act to demonstrate how you might go about using this infrastructure to generate source code or models.

## Usage

The types collected, such as `type`, `enum` etc are collected in the `store` entry of the config object passed in.

```js
const config = {};
const result = createSchema({ schema, config });
const { store } = config;
console.log(store);
```

### Examples

- [GraphQL example](./samples/graphql/GraphQL.md)
- [TypeORM example](./samples/typeorm/TypeORM.md)
- JSON graph schema - TODO

Note: As soon as we have a solid foundation and working examples we will move these into their own projects and publish them on [npm](http://npmjs.org)

## Testing

Uses [jest](jestjs.io/) for unit testing.

Please help add more/better test coverage :)

### Run tests in watch mode

```bash
$ npm run test:watch
```

### Run all tests

```bash
$ npm run test
```

## TODO

- State subscribers

## Author

2018 Kristian Mandrup (CTO@Tecla5)

## License

MIT
