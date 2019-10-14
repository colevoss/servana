module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['<rootDir>/test/'],
  testMatch: ['**/*.spec.ts'],
};
