import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$paraglide: "./src/paraglide",
			$elements: "./src/lib/elements",
			$layouts: "./src/lib/layouts",
			$shells: "./src/lib/shells",
			$utils: "./src/lib/utils",
			$config: "./src/lib/config"
		},
		prerendering: {
			origin: "https://emeraldstudio.fr"
		}
	},
	vitePlugin: {
		inspector: true
	}
};

export default config;
