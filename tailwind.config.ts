import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{html,svelte,js,ts}"],
	theme: {
		screens: {
			xs: "475px",
			...defaultTheme.screens
		},
		extend: {
			fontFamily: {
				sans: ["Chillax", ...defaultTheme.fontFamily.sans]
			},
			colors: {
				dominant: "#30d158"
			},
			borderColor: {
				primary: "white"
			},
			textColor: {
				primary: "white",
				inverted: "black"
			},
			backgroundColor: {
				primary: "black",
				secondary: "#1c1c1e"
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
