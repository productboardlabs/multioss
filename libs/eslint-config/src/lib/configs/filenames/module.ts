import { Linter } from 'eslint';

/**
 * FILENAMES PLUGIN
 * @see https://github.com/selaux/eslint-plugin-filenames
 */
export const config: Linter.Config = {
  plugins: ['filenames'],
  rules: {
    // allow only kebab-case, enum of suffixes, non endings with `-` -> (thats negative lookbehind `(?<!-)`)
    'filenames/match-regex': [
      'error',
      '^[.a-z][a-z18-]*(?<!-)(\\.(test|spec|mock|styles|hook|context|hoc|helpers|config|module|story|service|d))*$'
    ]
  }
};
