// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // 1. Core ESLint Recommended Rules
  eslint.configs.recommended,

  // 2. Ignore Files (like dist, node_modules, build artifacts)
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.js.map', 'src/__tests__/**'],
  },

  // 3. TypeScript Configuration
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Recommended TypeScript rules
      ...tseslint.configs.recommended,
      // Optional: Add strict rules for better quality
      // ...tseslint.configs.strict,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        // Specify your main tsconfig file for type-aware linting
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
        // You can add/override TypeScript rules here
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    }
  },

  // 4. React & React Hooks Configuration
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        // Tells eslint-plugin-react to automatically detect the React version
        version: 'detect', 
      },
    },
    rules: {
      // Use the new JSX transform rules for React 17+
      ...react.configs['jsx-runtime'].rules, 
      // Recommended rules for React hooks
      ...reactHooks.configs.recommended.rules,
      // Ensure React is not marked as unused when using the new JSX transform
      'react/react-in-jsx-scope': 'off', 
    },
  },

  // 5. Prettier Configuration
  // Must be the LAST configuration in the array to override all conflicting rules
  prettierConfig
);