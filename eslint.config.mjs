import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import react from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import vitestGlobals from "eslint-config-vitest-globals/flat";
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: [
      '**/node_modules/**',
      '**/src/serviceWorker.js',
      '**/build/**',
      '**/coverage/**',
      '**/dist/**',
    ],
    extends: [
      js.configs.recommended,
      tsEslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      importPlugin.flatConfigs.recommended,
      jsxA11yPlugin.flatConfigs.recommended,
      reactHooksPlugin.configs['recommended-latest'],
      sonarjsPlugin.configs.recommended,
      vitestGlobals()
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/ban-ts-comment": 0,
      'react/jsx-uses-react': 1,
      'react/function-component-definition': 0,
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react/react-in-jsx-scope': 0,
      'react/jsx-props-no-spreading': 0,
      'react/prop-types': 0,
      'react/require-default-props': 0,
      'sonarjs/assertions-in-tests': 0,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/test/**',
            '**/tests/**',
            '**/__tests__/**',
            '**/spec/**',
            '**/__mocks__/**',
          ],
        },
      ],
      'import/named': 0,
      'import/namespace': 0,
      'default-param-last': 0,
      'no-console': 'warn',
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
    }
  },
]);
