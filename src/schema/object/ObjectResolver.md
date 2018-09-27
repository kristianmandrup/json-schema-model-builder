# ObjectSchema

`ObjectSchema` resolves an `object` or a full `schema`.

- validate it is a valid JSON schema `object`
- If full schema: normalize `required` list of schema properties into each individual property
- create and resolve properties

## Validate

Must have `properties` object and have `type: 'object'`

```js
validate() {
  return this.validateProperties() && this.validateType()
}
```

## Normalize

Normalize `required` list from schema to add as `required` entry in each object property.

```js
normalize() {
  this.shouldNormalize() && this.normalizeProps()
}
```

## Resolve properties

- Create an `object` with `properties` and `ownerName` (name of object)
- Create a `PropertiesResolver` and use it to resolve the `properties` of the `object`

```js
resolve() {
  const object = {
    ownerName: name,
    properties: this.properties
  };
  const resolver = createPropertiesResolver({object, config})
  return resolver.resolve()
}
```

## Properties Resolver

See [Properties Resolver](./Properties.md)

## API

## Exposed functions

### createObjectResolver

creates instance of ObjectResolver

### resolveSchema

resolves a schema object

### resolve

resolves an object or schema object

## methods

### .addFingerprint

Creates a `fingerprint` and adds it as an entry to the cache

### .createFingerprint

Creates a `fingerprint` (with MD5 `hash`)

### .addToCache

Adds the `property` object definition in the `cache` (on `config`) using the `hash` as the map key.

### .schemaType

Either `object` or `schema`

### .hasPropertiesObject

If `object` has `properties`

### .isObject

If it has `type` of `object`

### .resolveSchema

resolves a schema object

### .resolve

resolves an object

### .resolveCollection

Resolves a specific collection, typically either `properties` or `definitions`

### .normalize

Normalizes `properties` collection if should be normalized

### .shouldNormalize

### .isSchema

Whether it is a schema object

### .normalizeProps

Normalizes `properties` collection

### .normalizeRequired

Normalizes `required` schema list into property schema object attributes
