import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";
import * as path from "path";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		prerender: { origin: "https://renewhq.studio" },
		paths: { base: "" },
		adapter: adapter(),
		alias: {
			$elements: path.resolve("./src/lib/elements"),
			$layouts: path.resolve("./src/lib/layouts"),
			$shells: path.resolve("./src/lib/shells")
		}
	}
};

export default config;
