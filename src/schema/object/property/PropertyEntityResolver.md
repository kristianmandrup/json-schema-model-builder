# Property Entity Resolver

The `PropertyEntityResolver` is used to resolve a property value of an object or schema to a target `Entity`. The entity has a `shape` with information.

## API

## exposed

### createPropertyEntityResolver({property, config})

Creates a `PropertyEntityResolver` instance that can resolve a `property` to an `entity`

## methods

### .isValidProperty

Whether the `property` is valid (and should be resolved)

### .isValidResolvers

Whether the `resolvers` available are valid

### .validateResolver(resolver, key)

Whether a particular `resolver` is valid (must be a `function`)

### .resolveMap(resolveShape)

Resolves the `property` to a map of entities. The `resolveShape` argument can be passed to customize how each entity is "shaped".

### .resolve()

Resolves a `property` to an `entity` calls `onEntity(entity)`.
Iterates through all of the `resolvers` and tries to call `resolver.resolve(property)` on each. The results are collected in a `map`.

By default the property is set up to collect an entity as either:

- `primitive`
- `object`
- `enum`

An `entity` is selected from the map of entities ant then `onEntity(entity)` is called, which by default will `dispatch` an `event` with the `entity`.

Finally the resolved `entity` is returned.

### .resolveType()

Resolves a `property` to an `entity`

### .resolveToEntity()

Resolves a `property` to an `entity` map then selects one entity

### .entityType(entity)

Extract the `type` from an entity

### .resolveShape(propType)

Resolves the "shape" from a property type instance (such as `StringType`).
By default using `propType.shape`

### selectEntity(map)

### onEntity

Use `onEntity` to handle when a new entity has been resolved.
By default the entity is dispatched to the dispatcher which then adds the entity to the `state` via `add(entity, type)`

````js
  onEntity(entity) {
    this.dispatch({
      payload: {
        ...entity
      }
    })
  }

  dispatch({payload}) {
    const event = {
      sender: this.sender,
      payload: payload
    }
    if (!this.dispatcher)
      this.warn('dispatch', 'missing dispatcher')
    this
      .dispatcher
      .dispatch(event)
  }
```

Further on use the state to add entity to the state model (and graph)

```js
this.state.add(entity.value, entity.type);
````
