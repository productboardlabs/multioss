import path from 'path';

import { legacy, recommended, requiresTypeCheckingRules } from './index';

describe(`eslint-config/configs`, () => {
  it(`should properly define eslint 'recommended' config`, () => {
    expect(recommended).toEqual({
      extends: [
        path.resolve(__dirname, './core/index.js'),
        path.resolve(__dirname, './import/index.js'),
        path.resolve(__dirname, './typescript/index.js'),
        path.resolve(__dirname, './sonar/index.js'),
        path.resolve(__dirname, './header/index.js'),
        path.resolve(__dirname, './jsdoc/index.js'),
        path.resolve(__dirname, './react/index.js'),
        path.resolve(__dirname, './prettier/index.js'),
        path.resolve(__dirname, './etc/index.js'),
        path.resolve(__dirname, './filenames/index.js')
      ],
      overrides: [
        {
          files: ['*.js'],
          rules: expect.any(Object)
        },
        {
          files: expect.any(Array),
          extends: [path.resolve(__dirname, './jest/index.js')]
        },
        {
          files: ['cypress/**'],
          rules: expect.any(Object)
        },
        {
          files: ['typings/**'],
          rules: expect.any(Object)
        }
      ],
      rules: {}
    });
  });

  it(`should properly define eslint 'legacy' config`, () => {
    expect(legacy).toEqual({
      overrides: [
        {
          files: ['src/js/**', 'apps/**', 'scripts/**'],
          rules: expect.any(Object)
        }
      ]
    });
  });

  it(`should properly define requiresTypeCheckingRules rule set`, () => {
    expect(requiresTypeCheckingRules).toEqual(expect.any(Object));
    expect(Object.keys(requiresTypeCheckingRules).length).toBeGreaterThan(0);
  });
});
