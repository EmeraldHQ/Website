import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import svelteEslintParser from "svelte-eslint-parser";
import eslintPluginSvelte from "eslint-plugin-svelte";
import prettier from "eslint-plugin-prettier/recommended";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
	js.configs.recommended,
	...tseslint.config({
		plugins: {
			"@typescript-eslint": tseslint.plugin
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: "module",
				ecmaVersion: 2020,
				extraFileExtensions: [".svelte"]
			},
			globals: {
				...globals.browser
			}
		},
		rules: {
			// Prefer `{ myFunction: () => {} }` over `{ myFunction() {} }`
			// https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
			"@typescript-eslint/method-signature-style": ["error", "property"],
			// Force the use of `import type { A }` over `import { type A }`
			// https://typescript-eslint.io/rules/no-import-type-side-effects/
			"@typescript-eslint/no-import-type-side-effects": "error"
		}
	}),
	{
		files: ["*.svelte"],
		languageOptions: {
			parser: svelteEslintParser,
			parserOptions: {
				parser: tseslint.parser
			}
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					varsIgnorePattern: "^\\$\\$(Props|Events|Slots)$"
				}
			]
		}
	},
	...eslintPluginSvelte.configs["flat/recommended"],
	prettier,
	{
		ignores: [
			".DS_Store",
			"node_modules/*",
			"build/*",
			".svelte-kit/*",
			"src/paraglide/*",
			"package/*",
			".env",
			".env.*",
			"pnpm-lock.yaml"
		]
	}
];
