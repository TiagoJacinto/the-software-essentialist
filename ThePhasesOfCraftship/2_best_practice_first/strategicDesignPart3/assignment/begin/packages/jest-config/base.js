/** @type {import("jest").Config} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
          },
          target: 'es2022',
          baseUrl: './',
          paths: {
            '@/*': ['./*'],
          },
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  clearMocks: true,
  setupFilesAfterEnv: [require('path').join(__dirname, './testSetup.js')],
};
