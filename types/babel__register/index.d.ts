// Type definitions for @babel/register [7.x]
// Project: https://github.com/babel/babel/tree/master/packages/babel-register, https://babeljs.io
// Definitions by: Martin Hochel <https://github.com/hotell>

import { TransformOptions } from '@babel/core';

/**
 * If you want to expose types from your module as well, you can place them in this block.
 */
declare namespace ConfigFn {
  interface Config extends TransformOptions {
    extensions?: Array<string>;
    cache?: boolean;
  }
}

declare const ConfigFn: (config?: ConfigFn.Config) => void;

export = ConfigFn;
