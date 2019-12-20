# @productboard/eslint-config

> This library was generated with [Nx](https://nx.dev).

This package provides Productboard's ESlint configuration with different variations.

## API

We provide 4 type of eslint configs

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

### legacy

Contains legacy set of rules for "old codebase" -> `src/**`, `apps/**`, `scripts/**`

**Usage:**

```js
/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: ['@productboard/eslint-config/legacy']
};
```

### legacy-without-type-checking

This is useful for pre-commit hooks as it turns out typescript checking and thus making linting blazing fast!

**Usage:**

```js
/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: ['@productboard/eslint-config/legacy-without-type-checking']
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
