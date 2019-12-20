import { config } from './module';

describe(`eslint-config/configs/core`, () => {
  it(`should properly define eslint core config`, () => {
    expect(config).toEqual({
      env: {
        browser: true,
        es2017: true,
        node: true
      },
      extends: ['eslint:recommended'],
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
      },
      rules: expect.any(Object)
    });
  });
});
