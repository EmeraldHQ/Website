import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{html,svelte,js,ts}"],
	theme: {
		extend: {}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
			addVariant("child-focus", "& > *:focus");
		})
	],
	future: {
		hoverOnlyWhenSupported: true
	}
} satisfies Config;
