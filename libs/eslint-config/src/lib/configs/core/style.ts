import { Linter } from 'eslint';

/**
 * Stylistic
 * @see https://eslint.org/docs/rules/#stylistic-issues
 */

export const rules: Linter.RulesRecord = {
  'max-len': ['off'],
  'new-cap': [
    'warn',
    // prettier-ignore
    { capIsNewExceptionPattern: '^Immutable\\.', capIsNewExceptions: ['Record'] }
  ],
  'func-names': ['error', 'as-needed'],
  'lines-between-class-members': [
    'warn',
    'always',
    { exceptAfterSingleLine: true }
  ],
  'no-restricted-syntax': ['off'],
  'no-mixed-operators': ['off'],
  'no-multi-assign': ['off'],
  'no-nested-ternary': ['off'],
  'no-underscore-dangle': [
    'warn',
    { allowAfterThis: true, allowAfterSuper: true }
  ],
  'no-plusplus': ['warn'],
  'no-bitwise': 'error',
  'one-var': ['error', 'never'],
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
  'padding-line-between-statements': [
    'warn',
    { blankLine: 'always', prev: '*', next: 'return' }
  ],
  'spaced-comment': ['warn', 'always', { exceptions: ['-', '=', '+'] }]
};
