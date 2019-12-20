import { Linter } from 'eslint';

import * as utils from '../utils';
import etcConfig from './etc';
import sonarConfig from './sonar';
import tsConfig from './typescript';

export const requiresTypeCheckingRules = {
  ...utils.pickConfigSettingsMetadata(tsConfig, 'requiresTypeCheckingRules'),
  ...utils.pickConfigSettingsMetadata(etcConfig, 'requiresTypeCheckingRules')
};

const sonarRulesForLegacyConfig = utils.mapRulesFromConfigTo(
  sonarConfig,
  'warn'
);

const legacyTurnedOffRules: Linter.RulesRecord = {
  'etc/no-const-enum': 'off',
  'etc/no-enum': 'off',

  'filenames/match-regex': 'off',

  'import/no-internal-modules': 'off'
};

export const recommended: Linter.Config = {
  extends: utils.resolvePaths(
    [
      './core',
      './import',
      './typescript',
      './sonar',
      './header',
      './jsdoc',
      './react',
      './prettier',
      './etc',
      './filenames'
    ],
    __dirname
  ),
  rules: {},
  overrides: [
    // General JavaScript
    {
      files: ['*.js'],
      rules: {
        'global-require': 'warn',

        'filenames/match-regex': 'off',

        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    // Jest Lint config
    {
      files: [
        '**/__tests__/**/*.js',
        '**/__mocks__/**/*.js',
        '**/*.test.js',
        '**/*test.jsx',
        '**/*test.js',
        '**/__tests__/**/*.ts',
        '**/__mocks__/**/*.ts',
        '**/*.test.ts',
        '**/*test.tsx'
      ],
      extends: utils.resolvePaths(['./jest'], __dirname)
    },

    // Cypress Lint config
    {
      files: ['cypress/**'],
      rules: {
        ...sonarRulesForLegacyConfig,
        ...legacyTurnedOffRules,

        'class-methods-use-this': 'off',
        '@typescript-eslint/no-unused-vars': 'warn'
      }
    },

    // Vendor libs ambient types
    {
      files: ['typings/**'],
      rules: {
        ...legacyTurnedOffRules,

        'header/header': 'off',

        'no-var': 'warn',

        '@typescript-eslint/array-type': ['warn', { default: 'generic' }],
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn'
      }
    }
  ]
};

export const recommendedWithoutTypeChecking: Linter.Config = utils.createConfigWithoutTsCheckRules(
  recommended,
  requiresTypeCheckingRules
);

export const legacy: Linter.Config = {
  overrides: [
    {
      files: ['src/js/**', 'apps/**', 'scripts/**'],
      rules: {
        ...sonarRulesForLegacyConfig,
        ...legacyTurnedOffRules,

        'new-cap': 'off',
        'class-methods-use-this': 'off',
        'no-case-declarations': 'warn',
        'no-useless-escape': 'warn',
        'no-multi-str': 'warn',
        'guard-for-in': 'warn',
        'no-sequences': 'warn',
        'func-names': ['warn', 'as-needed'],
        'no-irregular-whitespace': 'warn',
        // Because of ref callbacks,
        'no-return-assign': 'warn',

        // TYPE CHECKING REQUIRED
        // 🚨BAD PERF when used with `.js` files
        // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-515609334
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        '@typescript-eslint/prefer-regexp-exec': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',

        // NO TYPE CHECKING
        '@typescript-eslint/ban-ts-ignore': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/consistent-type-assertions': [
          // @TODO
          // should be error
          // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
          'warn',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter'
          }
        ],

        'react/display-name': 'off',
        'react/no-deprecated': 'warn',
        'react/no-access-state-in-setstate': 'warn',
        'react/no-string-refs': 'warn',
        'react/jsx-no-bind': [
          'warn',
          { allowArrowFunctions: true, allowFunctions: true }
        ],
        'react/jsx-no-target-blank': 'warn',
        'react/jsx-key': 'warn',
        'react/jsx-handler-names': 'off',

        // Might be dangerous for the codebase when Hooks are not pure. cc @opicacek
        'react-hooks/exhaustive-deps': 'off'
      }
    }
  ]
};

export const legacyWithoutTypeChecking: Linter.Config = utils.createConfigWithoutTsCheckRules(
  legacy,
  requiresTypeCheckingRules
);
