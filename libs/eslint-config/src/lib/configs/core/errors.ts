import { Linter } from 'eslint';

/**
 * Possible Errors
 * @see https://eslint.org/docs/rules/#possible-errors
 */
export const rules: Linter.RulesRecord = {
  'no-prototype-builtins': ['warn'],
  'no-console': ['warn'],
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-irregular-whitespace': ['error']
};
