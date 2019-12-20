/* eslint-disable filenames/match-regex */

import { Linter } from 'eslint';

/**
 * ECMAScript 6
 * @see https://eslint.org/docs/rules/#ecmascript-6
 */
export const rules: Linter.RulesRecord = {
  'prefer-destructuring': ['warn', { object: true, array: false }],
  'prefer-template': ['warn'],
  'prefer-rest-params': ['error'],
  'prefer-const': ['error'],
  'no-var': ['error'],
  'object-shorthand': ['error'],
  'no-duplicate-imports': ['error'],
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        '@productboard/*/*',
        '**/*.deprecated*',
        // @TODO remove once `ui` package has proper api
        '!@productboard/ui/*'
      ]
    }
  ]
};
