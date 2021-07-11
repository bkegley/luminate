const pjson = require('./package')

module.exports = {
  name: pjson.name,
  displayName: pjson.name,
  preset: 'ts-jest/presets/default',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/*.spec.(ts|tsx)', '**/*.spec.(ts|tsx)'],
  testPathIgnorePatterns: ['./node_modules/'],
}
