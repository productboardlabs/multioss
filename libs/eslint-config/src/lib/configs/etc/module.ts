import { Linter } from 'eslint';

import { LintConfig, LintSettings } from '../../types';

export const requiresTypeCheckingRules: Linter.RulesRecord = {
  'etc/deprecation': 'warn'
};

/**
 * @see https://github.com/cartant/eslint-plugin-etc
 */
export const config: LintConfig<LintSettings> = {
  plugins: ['etc'],
  settings: {
    metadata: {
      requiresTypeCheckingRules
    }
  },
  rules: {
    'etc/no-const-enum': 'error',
    'etc/no-enum': 'error',
    ...requiresTypeCheckingRules
  }
};
