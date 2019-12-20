import { Linter } from 'eslint';

export type LintConfig<Settings = Linter.Config['settings']> = Linter.Config & {
  settings: Settings;
};
export type LintSettings = {
  metadata: {
    requiresTypeCheckingRules: Linter.RulesRecord;
  };
};
