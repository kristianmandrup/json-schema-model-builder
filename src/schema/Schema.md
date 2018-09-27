# Schema resolver

Responsible for resolving a full schema, including `properties` and `definitions`

## API

## exposed

### createSchema({schema, config})

Creates a `Schema` instance used to resolve a schema object

## methods

## .resolve()

Resolves a `schema` (by default delegating to `resolve` of `ObjectResolver`)

```js
resolve() {
  // resolves both properties AND definitions
  resolveSchema({
    object: this.schema,
    config: this.config,
    opts: {
      schema: true
    }
  })
}
```

## Object resolver

See [Object resolver](./object/Object.md)
