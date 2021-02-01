const jestConfig = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  verbose: true,
  notify: true,
  testRegex: '\\.test\\.ts$',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  moduleDirectories: [
    './node_modules',
    './src',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
      'src/**/*.ts',
      'src/**/*.js',
  ],
  coverageThreshold: {
    global: {
      lines: 30,
      functions: 30,
      branches: 30,
      statements: 30,
    }
  },
  coverageDirectory: 'reports/coverage',
  setupFiles: [],
};
module.exports = jestConfig;
