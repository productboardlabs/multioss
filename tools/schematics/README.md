# Schematics

## API

- [Guide](https://angular.io/guide/schematics)
- [API (@angular-devkit/schematics)](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics/README.md)

### `template<T>(options: T)`

> applies both `contentTemplate()` and `pathTemplate()` to the entire `Tree`.
>
> Check [whole template modules source](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics/src/rules/template.ts)

![template interpolation](https://user-images.githubusercontent.com/1223799/71835156-28cba200-30b1-11ea-9a6e-7ae0f02d99f5.png)

## Recipes:

- [nx](https://connect.nrwl.io/app/cookbook/4in0DECnRZILfXVMh7Mdtr)

## FAQ

- **What's the difference between defining schematic as a factory vs standard function?**

```ts
export default function(schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return tree;
  };
}
```

vs

```ts
export default function(schema: any): Rule {
  return chain([
    // ...
  ]);
}
```

There is no difference, return a factory if you need to access(get injected) `Tree` or `SchematicContext`. Besides that it's up to you how the implementation looks like, only restriction is to always return `Rule`.
