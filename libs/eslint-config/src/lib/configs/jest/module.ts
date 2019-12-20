
import { Linter } from 'eslint';

/**
 * Jest
 * @see https://github.com/jest-community/eslint-plugin-jest
 */
export const config: Linter.Config = {
  env: {
    'jest/globals': true,
  },
  extends: [
    // https://github.com/jest-community/eslint-plugin-jest/blob/master/src/index.ts#L41
    'plugin:jest/recommended',
  ],
  rules: {},
};
