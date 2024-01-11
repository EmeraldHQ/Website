export function c(str: string, tClass = "text-dominant") {
	return str.replace("[", `<span class="${tClass}">`).replace("]", "</span>");
}
