/** @type {import('types/babel__register').Config} */
const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  /**
   * This is needed so pirate properly resolves paths when not called from root
   * @see https://github.com/babel/babel/issues/10349
   */
  cwd: __dirname,
  extensions: ['.jsx', '.js', '.ts', '.tsx']
};

module.exports = config;
