module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '/example-project/'],
  moduleNameMapper: {
    '^~example/(.*)$': '<rootDir>/example/$1',
  },
  testMatch: ['**/test/**/*.(spec|test).(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/.*(.mock.js)$'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,vue}', '!<rootDir>/src/**/*.mock.js', '<rootDir>/example/**/*.{js,vue}'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['html', 'lcov', 'clover', 'json', 'text', 'text-summary'],
  reporters: ['default', 'jest-html-reporters'],
  setupFiles: ['<rootDir>/jest.init.js', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
