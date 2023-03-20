/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./src/**/*.{html,svelte,js,ts}"
	],
	theme: {
		extend: {}
	},
	plugins: [
		require("tailwindcss/plugin")(function({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
			addVariant("child-focus", "& > *:focus");
		})
	],
	future: {
		hoverOnlyWhenSupported: true
	}
};
