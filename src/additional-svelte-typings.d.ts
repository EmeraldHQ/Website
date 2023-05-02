declare module "tailwindcss/lib/util/flattenColorPalette" {
	import type { ColorValue } from "tailwindcss/tailwind-config";
	export default function flattenColorPalette(
		colors: Record<string, ColorValue>
	): Record<string, string>;
}
