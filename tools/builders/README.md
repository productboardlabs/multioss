# Builders

> This folder contains a package with custom builders for nx architect

Currently [`nx` doesn't provide any schematics/npm-command to generate/run custom builders](https://github.com/nrwl/nx/issues/2211) (unlike for schematics). For that reason, we need to [follow standard Angular CLI builder guide about how build our own builders](https://angular.io/guide/cli-builder), with a bit of tweaking to be easily used within `nx`.

> hopefully in the future it will be implemented natively (it's indeed possible and I have idea in my mind how it could be achieved...)

**Folder(Package structure:**

```
├── command/  // builder
├── file/     // builder
├── babel-register.config.js // babel config for dynamic transpilation
├── builders.json // schema for all custom builders
├── package.json // standard npm package with dependencies
└── tsconfig.json
```

> For excellent intro into builders please read this [excellent blog post](https://medium.com/angular-in-depth/angular-cli-under-the-hood-builders-demystified-v2-e73ee0f2d811).

After reading above article, we know that custom builder/s need to be a standard namespaced npm package/packages. To follow best practices and custom schematics implementation within nx, all we need is just one npm package, that defines multiple builders.

In our case:

- name: `@custom-builders/builders`
- builders: `multiple` (defined within [`builders.json`](./builders.json))

**Builders Usage**

Builder packages can be used in 2 ways:

1. by referencing package name with builder

```json
{
  "architect": {
    "file": {
      "builder": "@custom-builders/builders:file",
      "options": {}
    }
  }
}
```

**Where:**

`"@custom-builders/builders:file"`

- `@custom-builders/builders` is our package name
- `:file` is our file builder

2. relative path to local package (we will use this method, as our custom builders are only for our build needs)

```json
{
  "architect": {
    "file": {
      "builder": "./tools/builders:file",
      "options": {}
    }
  }
}
```

**Where:**

`"./tools/builders:file"`

- `./tools/builders` is relative path to our builders package
- `:file` is our file builder

## Custom Builders

Custom builders within `nx` can be implemented and run via `nx` with 3 approaches:

1. vanilla js (no build step)
2. manual compilation (build step needed)
3. dynamic compilation (no build step)

Following two builders demonstrate approach 2 and 3.

> **Why not 1.?**
>
> Builder implementation uses a lot of generics. It would be cumbersome to write them with vanilla js and get proper type-safety and DX.

### [command](./command/schema.json)

> uses manual compilation

**Builder Schema**

```json
{
  "command": {
    "implementation": "./dist/command/index.js",
    "schema": "./command/schema.json",
    "description": "Runs any command line in the operating system."
  }
}
```

As you can see, we use compilation output as an `"implementation"` reference of our `command` builder

```json
"implementation": "./dist/command/index.js",
```

instead of real implementation which resides within `./command/index.ts`.

That means, before running any `architect` target, we need to have our builder physically present on our filesystem (compiled via typescript `yarn tsc -p tools/builders`).

That can be quite cumbersome indeed... Anyways this should be used when we wanna publish our builders to npm and use it from npm registry.

**Pros**

- easily publishable to npm

**Cons**

- manual compilation needed before executing `nx run`

### [file](./file/schema.json)

> uses dynamic compilation

**Builder Schema**

```json
{
  "file": {
    "implementation": "./file/index.js",
    "schema": "./file/schema.json",
    "description": "Builder that creates timestamp"
  }
}
```

As you can see, we use vanilla js barrel file as `"implementation"` reference of our `command` builder.

You might be thinking that we are not using typescript, but we are indeed! Our `index.js` is leveraging `@babel/register` to dynamically transpile all our typescript files (in this case, our builder implementation within [`./file.impl.ts`](./file.impl.ts)), thus everything is type safe... even that vanilla index.js (_checkJs_) ;).

Last required thing is to adhere to standard builder api, which needs default export of builder implementation. In our case it looks like following:

```js
// file.impl is TypeScript file that exports Builder as default export!
exports.default = require('./file.impl').default;
```

**Pros**

- no manual input needed
- low effort to publish as npm package

**Cons**

- `nx run` wont fail if there are any type errors present within implementation. (this is not a big deal as on CI, we'll run tsc on affected files anyway)
