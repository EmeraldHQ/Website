/**
 * @type {import("@inlang/core/config").DefineConfig}
 */
export async function defineConfig(env) {
	const { default: pluginJson } = await env.$import(
		"https://cdn.jsdelivr.net/gh/samuelstroschein/inlang-plugin-json@latest/dist/index.js"
	);

	const { default: sdkPlugin } = await env.$import(
		"https://cdn.jsdelivr.net/npm/@inlang/sdk-js-plugin@0.6.1/dist/index.js"
	);
	return {
		referenceLanguage: "en",
		languages: ["en", "fr"],
		plugins: [
			pluginJson({
				pathPattern: "./src/locales/{language}.json",
				variableReferencePattern: ["{", "}"]
			}),
			sdkPlugin({
				languageNegotiation: {
					strategies: [{ type: "localStorage" }]
				}
			})
		]
	};
}
