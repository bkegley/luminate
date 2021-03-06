module.exports = {
  preset: 'ts-jest/presets/default',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/*.(ts|tsx)', '**/*.spec.(ts|tsx)'],
  testPathIgnorePatterns: ['./node_modules/'],
}
