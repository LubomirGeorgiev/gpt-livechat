/** @type {import("eslint").Linter.Config} */
const config = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': true
  },
  'plugins': [
    '@typescript-eslint',
    'drizzle',
    'canonical'
  ],
  'extends': [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked'
  ],
  'rules': {
    '@typescript-eslint/ban-ts-comment': 'off',
    'canonical/no-unused-exports': ['error', { 'tsConfigPath': './tsconfig.json' }],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        'prefer': 'type-imports',
        'fixStyle': 'inline-type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^__ignore',
        'varsIgnorePattern': '^__ignore'
      },
    ],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        'checksVoidReturn': {
          'attributes': false
        }
      }
    ],
    'drizzle/enforce-delete-with-where': 'error',
    'drizzle/enforce-update-with-where': 'error'
  }
}
module.exports = config;
