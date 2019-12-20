
import { Linter } from 'eslint';

/**
 * JSDOC PLUGIN
 * @see https://github.com/gajus/eslint-plugin-jsdoc
 */
export const config: Linter.Config = {
  plugins: ['jsdoc'],
  rules: {
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-indentation': 'warn',
  },
};
