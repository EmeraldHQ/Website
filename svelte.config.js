import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";
import * as path from "path";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$elements: path.resolve("./src/lib/elements"),
			$layouts: path.resolve("./src/lib/layouts"),
			$shells: path.resolve("./src/lib/shells"),
			$utils: path.resolve("./src/lib/utils"),
			$server: path.resolve("./src/lib/server"),
		}
	},
	vitePlugin: {
		inspector: true
	}
};

export default config;
