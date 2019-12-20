
import { Linter } from 'eslint';

/**
 * @see https://github.com/prettier/eslint-config-prettier
 */
export const config: Linter.Config = {
  extends: [
    'prettier',
    // If you extend a config which uses a plugin, it is recommended to add "prettier/that-plugin" (if available). For example, eslint-config-airbnb enables eslint-plugin-react rules, so "prettier/react" is needed:
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  rules: {},
};
