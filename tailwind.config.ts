import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{html,svelte,js,ts}"],
	theme: {
		fontFamily: {
			sans: ["Chillax", "sans-serif"]
		},
		extend: {
			colors: {
				primary: "#30d158"
			},
			boxShadow: {
				"navbar-bottom": "inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1)"
			}
		}
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
