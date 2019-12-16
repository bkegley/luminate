module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['plugin:jest/recommended', 'eslint:recommended', 'eslint-config-prettier'],
  rules: {
    'no-console': 'off',
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
}
