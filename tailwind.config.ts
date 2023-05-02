import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import tailwindcss3d from "tailwindcss-3d";
import svgToTinyDataUri from "mini-svg-data-uri";

export default {
	content: ["./src/**/*.{html,svelte,js,ts}"],
	theme: {
		screens: {
			xs: "475px",
			...defaultTheme.screens,
			xxl: "1600px"
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
			},
			maxWidth: {
				"large-screen": "120rem"
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
			addVariant("child-focus", "& > *:focus");
			addVariant("hover-child", "&:hover > *");
		}),
		tailwindcss3d,
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"bg-grid": (value) => ({
						backgroundImage: `url("${svgToTinyDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`
					})
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
			);
		})
	],
	future: {
		hoverOnlyWhenSupported: true
	}
} satisfies Config;
