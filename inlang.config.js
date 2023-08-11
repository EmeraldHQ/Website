/**
 * @type {import("@inlang/core/config").DefineConfig}
 */
export async function defineConfig(env) {
	const { default: pluginJson } = await env.$import(
		"https://cdn.jsdelivr.net/npm/@inlang/plugin-json@3/dist/index.js"
	);

	const { default: sdkPlugin } = await env.$import(
		"https://cdn.jsdelivr.net/npm/@inlang/sdk-js-plugin@0.11.7/dist/index.js"
	);

	const { default: standardLintRules } = await env.$import(
		"https://cdn.jsdelivr.net/npm/@inlang/plugin-standard-lint-rules@3/dist/index.js"
	);

	return {
		referenceLanguage: "en",
		plugins: [
			pluginJson({
				pathPattern: "./src/locales/{language}/*.json",
				variableReferencePattern: ["{", "}"]
			}),
			sdkPlugin({
				languageNegotiation: {
					strategies: [{ type: "localStorage" }]
				}
			}),
			standardLintRules()
		]
	};
}
