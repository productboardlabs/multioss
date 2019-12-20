import { Linter } from 'eslint';
import { resolve } from 'path';

import { LintConfig, LintSettings } from './types';

export const pickConfigSettingsMetadata = (
  config: LintConfig<Partial<LintSettings>>,
  property: keyof LintSettings['metadata']
) => {
  const { settings } = config;
  if (!settings) {
    return {};
  }

  if (!settings.metadata) {
    return {};
  }

  return settings.metadata[property];
};

type PluginNamespaces =
  | 'etc'
  | 'sonarjs'
  | '@typescript-eslint'
  | 'react-hooks'
  | 'react'
  | 'jsx-a11y'
  | 'jsdoc'
  | 'import'
  | 'header'
  | 'filenames'
  | 'core';

export const mapRulesFromConfigTo = (
  config: Linter.Config,
  level: Linter.RuleLevel,
  pluginNamespace?: Array<PluginNamespaces>
) => {
  const { rules } = config;
  const ruleNames = Object.keys(rules || {});

  if (!rules || ruleNames.length === 0) {
    return {};
  }

  if (pluginNamespace) {
    return ruleNames.reduce(
      (acc, ruleName) => {
        const parseRuleName = /([@-\w]+)\/[-\w]+/.exec(ruleName);

        const isRuleNamespaceCore =
          !parseRuleName && pluginNamespace.includes('core');
        const isRuleFromPlugin =
          parseRuleName &&
          pluginNamespace.includes(parseRuleName[1] as PluginNamespaces);

        if (isRuleNamespaceCore || isRuleFromPlugin) {
          return { ...acc, [ruleName]: level };
        }

        return acc;
      },
      {} as Linter.RulesRecord
    );
  }

  return mapRulesTo(rules as Linter.RulesRecord, level);
};

export const mapRulesTo = (
  rules: Linter.RulesRecord,
  level: Linter.RuleLevel
): Linter.RulesRecord => {
  return Object.entries(rules).reduce(
    (acc, [key]) => {
      return { ...acc, [key]: level };
    },
    {} as Linter.RulesRecord
  );
};

export const transformRulesTo = (
  rules: Linter.RulesRecord,
  rulesToTransform: Linter.RulesRecord,
  level: Linter.RuleLevel
): Linter.RulesRecord => {
  return Object.entries(rules).reduce((acc, [rule, ruleConfig]) => {
    if (Object.prototype.hasOwnProperty.call(rulesToTransform, rule)) {
      return { ...acc, [rule]: level };
    }

    return { ...acc, [rule]: ruleConfig };
  }, {});
};

export const transformOverrideRules = (
  ruleOverrides: Array<Linter.RuleOverride>,
  rulesToTransform: Linter.RulesRecord,
  level: Linter.RuleLevel
): Array<Linter.RuleOverride> => {
  return ruleOverrides.map(overrideConfig => {
    // eslint-disable-next-line no-eq-null
    const hasRules = overrideConfig.rules != null;

    const transformedRules = hasRules
      ? transformRulesTo(
          overrideConfig.rules as Linter.RulesRecord,
          rulesToTransform,
          level
        )
      : null;

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      ...overrideConfig,
      ...(hasRules ? { rules: transformedRules } : null)
    } as Linter.RuleOverride;
  });
};

export const createConfigWithoutTsCheckRules = (
  config: Linter.Config,
  tsCheckRules: Linter.RulesRecord
): Linter.Config => {
  return {
    ...config,
    parserOptions: {
      ...config.parserOptions,
      // TURN OFF TSC
      project: null
    },
    ...(config.rules
      ? {
          rules: {
            ...mapRulesTo(tsCheckRules, 'off'),
            ...transformRulesTo(
              config.rules as Linter.RulesRecord,
              tsCheckRules,
              'off'
            )
          }
        }
      : null),
    ...(config.overrides
      ? {
          overrides: transformOverrideRules(
            config.overrides,
            tsCheckRules,
            'off'
          )
        }
      : null)
  };
};

export const resolvePaths = (paths: Array<string>, base: string) =>
  paths.map(path => require.resolve(resolve(base, path)));
