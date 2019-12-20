import { Linter } from 'eslint';

import {
  createConfigWithoutTsCheckRules,
  mapRulesFromConfigTo,
  mapRulesTo
} from './utils';

describe(`utils`, () => {
  const typeCheckedRuleSet: Linter.RulesRecord = {
    '@typescript-eslint/no-explicit-any': ['error']
  };
  const testRuleSet: Linter.RulesRecord = {
    'prefer-destructuring': ['error', { object: true, array: false }],
    'prefer-template': ['warn'],
    'no-var': ['off']
  };

  describe(`#createConfigWithoutTsCheckRules`, () => {
    it(`should turn add rules with type checking needed off even if they are not present`, () => {
      const actual = createConfigWithoutTsCheckRules(
        {
          parserOptions: {
            project: ['./.eslintrc.js']
          },
          rules: {
            ...testRuleSet
          }
        },
        typeCheckedRuleSet
      );
      const expected = {
        parserOptions: {
          project: null
        },
        rules: {
          'prefer-destructuring': ['error', { object: true, array: false }],
          'prefer-template': ['warn'],
          'no-var': ['off'],
          '@typescript-eslint/no-explicit-any': 'off'
        }
      };

      expect(actual).toEqual(expected);
    });

    it(`should turn off type checking dependant rules within 'rules' definition`, () => {
      const actual = createConfigWithoutTsCheckRules(
        {
          parserOptions: {
            project: ['./.eslintrc.js']
          },
          rules: {
            ...testRuleSet,
            ...typeCheckedRuleSet
          }
        },
        typeCheckedRuleSet
      );

      const expected = {
        parserOptions: {
          project: null
        },
        rules: {
          'prefer-destructuring': ['error', { object: true, array: false }],
          'prefer-template': ['warn'],
          'no-var': ['off'],
          '@typescript-eslint/no-explicit-any': 'off'
        }
      };

      expect(actual).toEqual(expected);
    });

    it(`should turn off type checking dependant rules within 'overrides' definition`, () => {
      const actual = createConfigWithoutTsCheckRules(
        {
          parserOptions: {
            project: ['./.eslintrc.js']
          },
          overrides: [
            {
              files: ['./some/folder/*.ts'],
              rules: {
                ...testRuleSet,
                ...typeCheckedRuleSet
              }
            }
          ]
        },
        typeCheckedRuleSet
      );

      const expected = {
        parserOptions: { project: null },
        overrides: [
          {
            files: ['./some/folder/*.ts'],
            rules: {
              'prefer-destructuring': ['error', { object: true, array: false }],
              'prefer-template': ['warn'],
              'no-var': ['off'],
              '@typescript-eslint/no-explicit-any': 'off'
            }
          }
        ]
      };

      expect(actual).toEqual(expected);
    });
  });

  describe(`#mapRulesFromConfigTo`, () => {
    it(`should return empty object if provided config has no rules`, () => {
      const config: Linter.Config = {
        rules: {}
      };
      const configWithoutRules: Linter.Config = {};

      let actual = mapRulesFromConfigTo(config, 'warn');
      let expected = {};

      expect(actual).toEqual(expected);

      actual = mapRulesFromConfigTo(configWithoutRules, 'warn');
      expected = {};

      expect(actual).toEqual(expected);
    });

    it(`should transform rules from provided config to particular severity`, () => {
      const config: Linter.Config = {
        rules: {
          ...testRuleSet
        }
      };

      const actual = mapRulesFromConfigTo(config, 'warn');
      const expected = {
        'prefer-destructuring': 'warn',
        'prefer-template': 'warn',
        'no-var': 'warn'
      };

      expect(actual).toEqual(expected);
    });

    it(`should transform rules from provided config by plugin prefix only to particular severity`, () => {
      const config: Linter.Config = {
        rules: {
          ...testRuleSet,
          ...typeCheckedRuleSet
        }
      };

      let actual = mapRulesFromConfigTo(config, 'warn', ['@typescript-eslint']);
      let expected: Linter.RulesRecord = {
        '@typescript-eslint/no-explicit-any': 'warn'
      };

      expect(actual).toEqual(expected);

      actual = mapRulesFromConfigTo(config, 'warn', ['core']);
      expected = {
        'prefer-destructuring': 'warn',
        'prefer-template': 'warn',
        'no-var': 'warn'
      };

      expect(actual).toEqual(expected);

      actual = mapRulesFromConfigTo(config, 'warn', [
        '@typescript-eslint',
        'core'
      ]);
      expected = {
        '@typescript-eslint/no-explicit-any': 'warn',
        'prefer-destructuring': 'warn',
        'prefer-template': 'warn',
        'no-var': 'warn'
      };

      expect(actual).toEqual(expected);
    });
  });

  describe(`#mapRulesTo`, () => {
    it(`should transform rules to particular severity`, () => {
      const actual = mapRulesTo(testRuleSet, 'warn');
      const expected = {
        'prefer-destructuring': 'warn',
        'prefer-template': 'warn',
        'no-var': 'warn'
      };

      expect(actual).toEqual(expected);
    });
  });
});
