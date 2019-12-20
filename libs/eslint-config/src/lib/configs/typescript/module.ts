
import { Linter } from 'eslint';

import { LintConfig, LintSettings } from '../../types';

export const requiresTypeCheckingRules: Linter.RulesRecord = {
  // eslint-disable-next-line global-require
  ...require('@typescript-eslint/eslint-plugin').configs[
    'recommended-requiring-type-checking'
  ].rules,

  // EXTRA RULES
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
};

/**
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin
 */
export const config: LintConfig<LintSettings> = {
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    metadata: {
      requiresTypeCheckingRules,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    ...requiresTypeCheckingRules,

    // handled by TS
    '@typescript-eslint/no-func-assign': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: true,
      },
    ],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        overrides: {
          constructors: 'off',
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/camelcase': [
      'warn',
      { properties: 'never', allow: ['^UNSAFE_', '^unstable_'] },
    ],
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { path: 'never', types: 'never', lib: 'never' },
    ],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        caughtErrors: 'all',
      },
    ],
  },
};
