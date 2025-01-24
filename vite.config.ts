import { sveltekit } from "@sveltejs/kit/vite";
import { paraglide } from "@inlang/paraglide-sveltekit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglide({
			project: "./project.inlang",
			outdir: "./src/paraglide"
		})
	]
});
