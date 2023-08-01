import type { InlangString } from "@inlang/sdk-js/runtime";

export function c(str: InlangString, tClass = "text-dominant") {
	return str.replace("[", `<span class="${tClass}">`).replace("]", "</span>");
}
