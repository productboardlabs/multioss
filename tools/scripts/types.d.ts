import { CoreProperties } from '@schematics/update/update/package-json';

export interface PackageJSON extends CoreProperties {
  /**
   * webpack target
   */
  module?: string;
  es2015?: string;
  /**
   * Typescript types
   */
  types?: string;
  typings?: string;
}
