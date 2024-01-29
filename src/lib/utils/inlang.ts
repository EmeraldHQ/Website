import { createI18n } from "@inlang/paraglide-js-adapter-sveltekit";
import * as runtime from "$paraglide/runtime";

export const i18n = createI18n(runtime);

/**
 * Deconstructs a pathname into its language and unprefixed pathname
 * @param pathname The pathname to work with
 * @param route The corresponding route to the pathname
 * @returns A tuple of the language and unprefixed pathname
 */
export function deconstructPathname(pathname: string, route: string): [string, string] {
	const routeSuffixRemoved = pathname.slice(
		1,
		pathname.length - (route === "/" ? 0 : route.length)
	);
	if (routeSuffixRemoved) {
		return [routeSuffixRemoved, pathname.slice(routeSuffixRemoved.length + 1) || "/"];
	}
	return [runtime.sourceLanguageTag, route];
}

export function c(str: string, tClass = "text-dominant") {
	return str.replace("[", `<span class="${tClass}">`).replace("]", "</span>");
}
