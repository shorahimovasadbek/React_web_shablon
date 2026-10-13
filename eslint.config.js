import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      // Feature ichidan boshqa feature'ga to'g'ridan-to'g'ri import qilinmasin — umumiy narsa shared/ ga chiqariladi
      'no-restricted-imports': ['error', { patterns: [{ group: ['../*/**'], message: 'Alias ishlating: @core, @shared, @features' }] }],
    },
  },
]);
