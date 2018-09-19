module.exports = {
  bail: true,
  verbose: true,
  moduleDirectories: ['node_modules', 'app'],
  setupTestFrameworkScriptFile: '<rootDir>/__tests__/setup/setupEnzyme.js',
  testPathIgnorePatterns: ['<rootDir>/__tests__/setup/']
};
