# Properties Resolver

Iterate through the properties map of an `object` and resolve each entry using `PropertyResolver`.

## API

The main api is to create a properties resolver:

Factory method `createPropertiesResolver`

```js
const resolver = createPropertiesResolver({ object, config });
```

You can also use the class `PropertiesResolver` directly

```js
const resolver = new PropertiesResolver({ object, config });
```

### Resolve

```js
resolve() {
  return Object
    .keys(this.properties)
    .reduce(this.reduceProp.bind(this), {})
}
```

### Reduce property

```js
reduceProp(acc, key) {
  const property = this.prepareProperty(key)
  const propertyEntityResolver = createPropertyEntityResolver({property, config: this.config})
  const entity = propertyEntityResolver.resolve()
  acc[key] = entity
  return acc
}
```

### prepareProperty

Prepare property object to be resolved (to entity) by adding contextual data

```js
prepareProperty(key) {
  const property = this.properties[key]
  // prepare property object
  property.ownerName = this.ownerName
  property.key = key
  return property
}
```

### transformEntity

You can pass a custom `transformEntity` function in the `config` object which can be used to transform each property entity model to the form you need for your particular scenario.

```js
const config = {
  transformEntity: (entity, { config, ctx }) => {
    return myTransform(entity);
  }
};

const resolver = createPropertiesResolver(object, config);
resolver.resolve();
```

## Properties Entity Resolver

See [Properties Entity Resolver](./property/PropertyEntityResolver.md)

## API

## exposed

### createPropertiesResolver({object, config})

Create a `PropertiesResolver` instance

## methods

### .resolve(force = false)

Resolve properties

### .groupByTypes

Group resolved entities by type (ie. `kind`)

### .reduceProp(acc, key)

Reduce a single property

### .prepareProperty(key)

Prepare a property for `resolve`
