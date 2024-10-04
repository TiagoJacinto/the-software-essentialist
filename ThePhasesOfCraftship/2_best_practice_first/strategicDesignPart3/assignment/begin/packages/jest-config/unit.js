/** @type {import("jest").Config} */
module.exports = {
  ...require('./base'),
  testMatch: ['**/(src|test|tests|__test__|__tests__)/**/*.(test|spec).ts'],
};
