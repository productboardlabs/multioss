import {
  recommended,
  recommendedWithoutTypeChecking,
  requiresTypeCheckingRules
} from './configs';
import {
  createConfigWithoutTsCheckRules,
  mapRulesFromConfigTo,
  mapRulesTo
} from './utils';

export const utils = {
  createConfigWithoutTsCheckRules,
  mapRulesFromConfigTo,
  mapRulesTo
};

export const rules = {
  requiresTypeCheckingRules
};

export const configs = {
  recommended,
  recommendedWithoutTypeChecking
};
