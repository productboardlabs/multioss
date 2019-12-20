import { Linter } from 'eslint';

/**
 * Best Practices
 * @see https://eslint.org/docs/rules/#best-practices
 */
export const rules: Linter.RulesRecord = {
  'dot-notation': ['error'],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  curly: ['error'],
  'class-methods-use-this': ['error'],
  'guard-for-in': ['error'],
  radix: 'error',
  yoda: ['error'],
  'default-case': ['warn'],
  'consistent-return': ['off'],
  'prefer-promise-reject-errors': ['warn'],
  'no-else-return': ['warn', { allowElseIf: false }],
  'no-alert': ['error'],
  'no-lonely-if': ['off'],
  'no-param-reassign': ['off'],
  'no-eq-null': ['error'],
  'no-eval': ['error'],
  'no-global-assign': ['error'],
  'no-multi-str': ['error'],
  'no-new': ['error'],
  'no-proto': ['error'],
  'no-return-assign': ['error'],
  'no-sequences': ['error'],
  'no-unused-expressions': [
    'error',
    { allowShortCircuit: true, allowTernary: true }
  ],
  'no-caller': 'error',
  'no-throw-literal': 'error',
  'no-new-wrappers': 'error',
  'max-classes-per-file': 'warn'
};
