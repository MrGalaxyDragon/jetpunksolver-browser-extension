import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import nounsanitized from 'eslint-plugin-no-unsanitized';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		files: ['**/*.js', '**/*.ts'],
		languageOptions: { sourceType: 'module' },
		plugins: {
			js,
			nounsanitized
		},
		extends: ['js/recommended'],
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			'no-unsanitized/method': 'error',
			'no-unsanitized/property': 'error'
		}
	},
	{
		files: ['src/**/*.js', 'src/**/*.ts'],
		languageOptions: { globals: globals.browser }
	},
	{
		files: ['scripts/**/*.js', 'scripts/**/*.ts'],
		languageOptions: { globals: globals.node }
	},
	{
		ignores: ['dist/']
	},
	...tseslint.configs.recommended,
	eslintConfigPrettier
]);
