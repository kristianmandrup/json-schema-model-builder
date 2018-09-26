# Building blocks

This project contains basic building blocks that you can further customize to suit your particular model building scenario.

Use or extends any of the following classes available to build and customize your own infrastructure.

## Schema

Resolves a full schema, including `properties` and `definitions`

## ObjectResolver

Resolves the properties for an `object` (including `schema` and `definition`).

## PropertiesResolver

Iterates through the properties map of an `object` and resolve each entry using a `PropertyResolver`.

## PropertyEntityResolver

Used to resolve a property value of an object or schema to a target `entity`.
An `entity` has a `kind` (such as `primitive`, `enum`, `type`) and a `shape` with information.

Please note that by default it uses all the resolves exported in `types/index.js`, however you can pass your own custom map of `resolvers` via `config` object (ie. via `config.resolvers`)

## Primitives

The following classes can be used to control how individual types JSON schema property types are resolved.

### StringType

Resolve type information for a `string` property

### BooleanType

Resolve type information for a `boolean` property

### DateType

Resolve type information for a `date` property (string with format: `date-time`)

### EnumType

Resolve type information for an `enum` property (ie. any property with `enum` attribute)

### ObjectType

Resolve type information for an `object` property

#### ObjectTypeNameResolver

Resolves object type name using different strategies

### ArrayType

Resolve type information for an `array` property

#### ItemsResolver

Resolves types for an array `items` list

## DefinitionRefResolver

Resolves a definition reference for `$ref` by looking up the reference in rhe schema `definitions` map

## Factories

The framework will shortly be further refined to make it easier to pass in custom factories as needed instead of relying on extending classes and rebuilding the full infra.

An example of this can be seen in `ItemsResolver`

```js
  getCreatePropertyEntityResolver(config) {
    return (config.factories || {}).createPropertyEntityResolver || createPropertyEntityResolver
  }
```
