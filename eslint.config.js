import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.es2017,
				...globals.node
			}
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					varsIgnorePattern: "^\\$\\$(Props|Events|Slots)$"
				}
			],
			// Prefer `{ myFunction: () => {} }` over `{ myFunction() {} }`
			// https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
			"@typescript-eslint/method-signature-style": ["error", "property"],
			// Force the use of `import type { A }` over `import { type A }`
			// https://typescript-eslint.io/rules/no-import-type-side-effects/
			"@typescript-eslint/no-import-type-side-effects": "error"
		}
	},
	{
		ignores: [
			".DS_Store",
			"build/",
			".svelte-kit/",
			"package/",
			"vite.config.ts.*",
			"src/paraglide/"
		]
	}
];
