module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'jsx',
    'json',
  ],
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  // setupFiles: ['<rootDir>/test/setup'],
  moduleNameMapper: {
    '\\.(s?css|less)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/test/**/*.(spec|test).(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,vue}'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['html', 'lcov', 'json', 'text', 'text-summary'],
  reporters: ['default', 'jest-html-reporters'],
  setupFiles: [
    '<rootDir>/jest.init.js',
  ],
  testEnvironment: 'jsdom'
};