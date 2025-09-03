import globals from 'globals';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';

export default defineConfig([
	{
		files: ['**/*.js', '**/*.ts'],
		languageOptions: { sourceType: 'module' },
		plugins: {
			js
		},
		extends: ['js/recommended'],
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn'
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
	}
]);
