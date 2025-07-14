import eslintPluginPromise from 'eslint-plugin-promise'
import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      promise: eslintPluginPromise,
    },
    rules: {
      semi: ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'comma-dangle': ['error', 'always-multiline'],
      'promise/always-return': 'error',
      'promise/catch-or-return': 'error',
      'promise/param-names': 'error',
      'promise/no-native': 'error',
      'promise/no-return-wrap': 'error',
      'promise/avoid-new': 'off',
      'promise/no-nesting': 'off',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': 'off',
      'newline-per-chained-call': 'off',
      'no-confusing-arrow': 'off',
      'no-console': 'warn',
      'no-use-before-define': 'off',
      'prefer-template': 'error',
      'class-methods-use-this': 'off',
      'require-yield': 'off',
      'no-underscore-dangle': 'off',
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
      'guard-for-in': 'off',
      'no-await-in-loop': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-prototype-builtins': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          moduleDirectory: ['node_modules', '.'],
        },
      },
    },
  },
]
