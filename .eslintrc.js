module.exports = {
  env: {
    browser: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',

    '@typescript-eslint/ban-types': 'off',

    '@typescript-eslint/no-explicit-any': 'off',

    '@typescript-eslint/no-unused-vars': 'off',

    'import/order': 'off',

    'no-async-promise-executor': 'off',

    'no-empty': ['error', { allowEmptyCatch: true }],

    'prefer-const': ['error', { destructuring: 'all' }],

    'node/handle-callback-err': 'off',

    radix: ['warn', 'as-needed'],

    'react/jsx-no-target-blank': 'off',

    'react/jsx-uses-react': 'off',

    'react/prop-types': 'off',

    'react/react-in-jsx-scope': 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
