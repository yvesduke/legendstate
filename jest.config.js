module.exports = {
  preset: 'react-native',
  displayName: {name: 'LEGEND STATE', color: 'blue'},
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    'text-summary',
    ['text', {skipFull: true}],
  ],
  coverageDirectory: 'report',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/types/'],
  roots: ['<rootDir>/src'],
};
