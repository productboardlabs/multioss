import { Linter } from 'eslint';

export const rules: Linter.RulesRecord = {
  // nodejs + commonjs
  // https://eslint.org/docs/rules/#nodejs-and-commonjs
  'global-require': ['error'],
  'no-mixed-requires': ['error']
};
