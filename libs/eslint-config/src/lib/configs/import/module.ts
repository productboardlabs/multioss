
import { Linter } from 'eslint';

/**
 * IMPORT plugin
 * @see https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
 */
export const config: Linter.Config = {
  extends: [
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
    'plugin:import/typescript',
  ],
  plugins: ['import'],
  rules: {
    'import/first': ['error'],
    'import/newline-after-import': ['error'],
    'import/no-amd': ['error'],
    'import/no-webpack-loader-syntax': ['error'],
    // 🚨 PERF ISSUE - this rule is slow 40% of lint time
    'import/no-internal-modules': ['error'],
    'import/no-extraneous-dependencies': [
      // @FIXME https://github.com/benmosher/eslint-plugin-import/issues/1302
      'off',
    ],

    // 🚨PERF HELL
    'import/no-named-as-default': ['off'],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    // Disabled because of issues with the rule
    'import/imports-first': ['off'], // Disabled because also enforces import sorting for backwards compatibility, see https://github.com/benmosher/eslint-plugin-import/issues/5
    // Disabled because we don't like them or not powerful enough for our needs
    'import/order': ['off'],
    // 🚨PERF HELL (44.3% time) --> etc/deprecation is used
    'import/no-deprecated': ['off'],
  },
};
