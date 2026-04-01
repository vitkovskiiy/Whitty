module.exports = {
  globalSetup: '<rootDir>/scripts/jest-setup.js', 
  testEnvironment: 'node',
  testMatch: ['**/test/integration/**/*.test.js'],
  verbose: true,
  clearMocks: true,
  forceExit: true,
};
