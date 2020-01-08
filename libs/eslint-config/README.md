# @productboard/eslint-config

> This library was generated with [Nx](https://nx.dev).

This package provides Productboard's ESlint configuration with different variations.

## Installation

```sh
yarn add -D @productboard/eslint-config
```

You'll also need to install all peer dependencies by your own

> We don't wanna bundle particular version of libs that you're using, although we provide some dependency constrains via `^`

```sh
yarn add -D @types/eslint eslint eslint-config-prettier eslint-plugin-{etc,filenames,header,import,jest,jsdoc,jsx-a11y,prettier,react,react-hooks,sonarjs} confusing-browser-globals
```

## API

We provide 2 type of eslint configs

### recommended

Or recommended set of lint rules used within our codebase

**Usage:**

```js
/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: ['@productboard/eslint-config/recommended']
};
```

### recommended-without-type-checking

This is useful for pre-commit hooks as it turns out typescript checking and thus making linting blazing fast!

**Usage:**

```js
/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: ['@productboard/eslint-config/recommended-without-type-checking']
};
```

### utils

This package ships also various helpers for tweaking any eslint type of config.

TypeScript will tell you what is supported.

```js
const { utils } = require('@productboard/eslint-config');

// now use utils API
```

### rules

Part of public API is also static RuleSet record

```js
const { rules } = require('@productboard/eslint-config');

// now use rules
```

--

# Development

## Running unit tests

Run `nx test eslint-config` to execute the unit tests via [Jest](https://jestjs.io).

## Running build

Run `nx build eslint-config` to execute build that produces package ready for publishing.
