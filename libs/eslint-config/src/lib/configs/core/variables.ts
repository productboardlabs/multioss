import confusingBrowserGlobals from 'confusing-browser-globals';
import { Linter } from 'eslint';

const restrictedGlobals = [
  // @see https://github.com/facebook/create-react-app/tree/master/packages/confusing-browser-globals
  ...confusingBrowserGlobals
];

/**
 * Variables
 * @see https://eslint.org/docs/rules/#variables
 */

export const rules: Linter.RulesRecord = {
  'no-restricted-globals': ['error', ...restrictedGlobals],
  'no-shadow': ['off'],
  'no-undef-init': 'error'
};
