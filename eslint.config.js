// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // 1. Recommended JavaScript rules from ESLint itself
{
    ignores: ["**/__tests__/**"],
  },

  js.configs.recommended,

  // 2. Recommended React rules
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // General React rules
      ...react.configs.recommended.rules,
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // You can add custom rules here
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
];