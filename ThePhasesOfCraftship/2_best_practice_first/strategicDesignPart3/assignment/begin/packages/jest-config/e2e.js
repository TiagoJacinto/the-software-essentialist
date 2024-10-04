/** @type {import("jest").Config} */
module.exports = {
  ...require('./base'),
  testMatch: ['**/(src|test|tests|__test__|__tests__)/**/*.e2e.(test).ts'],
  // Run one at a time to avoid port conflicts
  maxWorkers: 1,
};
