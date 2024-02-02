import { createI18n } from "@inlang/paraglide-js-adapter-sveltekit";
import * as runtime from "$paraglide/runtime";

export const i18n = createI18n(runtime);

export function c(str: string, tClass = "text-dominant") {
	return str.replace("[", `<span class="${tClass}">`).replace("]", "</span>");
}
