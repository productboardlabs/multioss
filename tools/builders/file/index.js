const babelRegister = require('@babel/register');
const config = require('../babel-register.config');

babelRegister(config);

// REQUIRED BUILDER API: re-export default as default
exports.default = require('./file.impl').default;
