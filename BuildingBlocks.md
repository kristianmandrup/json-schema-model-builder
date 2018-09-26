# Building blocks

This project contains basic building blocks that you can further customize to suit your particular model building scenario.

Use or extends any of the following classes available to build and customize your own infrastructure.

## Dispatcher

See [Dispatcher](./dispatcher/Dispatcher.md)

## State

See [State](./state/State.md)

## Builder

See [Builder](./builder/Builder.md)

## Schema resolvers

The following lays out the main building blocks for parsing a JSON schema to extract nodes and build a model from it.

## Schema

[Schema](./schema/Schema.md) resolves a full schema, including `properties` and `definitions`

## ObjectResolver

[ObjectResolver](./schema/object/ObjectResolver.md) resolves the properties for an `object` (including `schema` and `definition`).

## PropertiesResolver

[PropertiesResolver](./schema/object/PropertiesResolver.md) iterates through the properties map of an `object` and resolve each entry using a `PropertyResolver`.

## PropertyEntityResolver

[PropertyEntityResolver](./schema/object/property/PropertyEntityResolver.md) resolves a property value of an object or schema to a target `entity`.

An `entity` has a `kind` (such as `primitive`, `enum`, `type`) and a `shape` with information.

Please note that by default the resolver uses all the resolves exported in `types/index.js`, however you can pass your own custom map of `resolvers` via `config` object (ie. via `config.resolvers`)

## Property Types

The following classes can be used to control how individual types JSON schema property types are resolved.

[PropertyTypes](./schema/object/property/types/PropertyTypes.md)

### StringType

[StringType](./schema/object/property/types/StringType.md) resolves type information for a `string` property

### BooleanType

[BooleanType](./schema/object/property/types/BooleanType.md) resolves type information for a `boolean` property

### DateType

[DateType](./schema/object/property/types/DateType.md) resolves type information for a `date` property (string with format: `date-time`)

### EnumType

[EnumType](./schema/object/property/types/EnumType.md) resolves type information for an `enum` property (ie. any property with `enum` attribute)

### ObjectType

[ObjectType](./schema/object/property/types/ObjectType.md) resolves type information for an `object` property

#### ObjectTypeNameResolver

[ObjectTypeNameResolver](./schema/object/property/types/ObjectTypeNameResolver.md) resolves object type name using different strategies

### ArrayType

[ArrayType](./schema/object/property/types/ArrayType.md) resolves type information for an `array` property

#### ItemsResolver

[ItemsResolver](./schema/object/property/types/ItemsResolver.md) resolves types for an array `items` list

## DefinitionRefResolver

[DefinitionRefResolver](./schema/object/property/types/DefinitionRefResolver.md) resolves a definition reference for `$ref` by looking up the reference in rhe schema `definitions` map

## Factories

The framework will shortly be further refined to make it easier to pass in custom factories as needed instead of relying on extending classes and rebuilding the full infra.

An example of this can be seen in `ItemsResolver`

```js
  getCreatePropertyEntityResolver(config) {
    return (config.factories || {}).createPropertyEntityResolver || createPropertyEntityResolver
  }
```
