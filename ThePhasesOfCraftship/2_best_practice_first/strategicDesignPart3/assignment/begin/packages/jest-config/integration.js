/** @type {import("jest").Config} */
module.exports = {
  ...require('./base'),
  testMatch: ['**/(src|test|tests|__test__|__tests__)/**/*.(infra|api|integration).(spec|test).ts'],
  // Run one at a time to avoid port and other conflicts
  maxWorkers: 1,
};
