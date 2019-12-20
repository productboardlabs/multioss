import { Linter } from 'eslint';

import { rules as bestPracticesRules } from './best-practices';
import { rules as errorsRules } from './errors';
import { rules as es6Rules } from './es6';
import { rules as nodeRules } from './node';
import { rules as strictRules } from './strict';
import { rules as styleRules } from './style';
import { rules as variablesRules } from './variables';

export const config: Linter.Config = {
  extends: [
    // https://eslint.org/docs/rules/
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
    'eslint:recommended'
  ],
  env: {
    browser: true,
    node: true,
    es2017: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    ...bestPracticesRules,
    ...errorsRules,
    ...es6Rules,
    ...nodeRules,
    ...strictRules,
    ...styleRules,
    ...variablesRules
  }
};
