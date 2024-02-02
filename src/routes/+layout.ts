import type { LayoutLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";
import {
	availableLanguageTags,
	isAvailableLanguageTag,
	sourceLanguageTag
} from "$paraglide/runtime";
import { i18n } from "$utils/inlang";

export const prerender = true;

export const load: LayoutLoad = ({ route, url }) => {
	if (!browser) return;

	function conditionallyRedirectTo(
		lang: (typeof availableLanguageTags)[number] = sourceLanguageTag
	) {
		if (!route.id) return;
		const resolved = i18n.resolveRoute(route.id, lang);
		if (resolved !== url.pathname) {
			redirect(307, resolved);
		}
	}

	let lang = localStorage.getItem("language");
	if (lang && isAvailableLanguageTag(lang)) {
		conditionallyRedirectTo(lang);
	} else {
		lang = navigator.language;
		if (isAvailableLanguageTag(lang)) {
			localStorage.setItem("language", lang);
			conditionallyRedirectTo(lang);
		} else {
			const splitLang = lang.split("-");
			if (splitLang.length > 1) {
				const firstPart = splitLang[0];
				if (firstPart && isAvailableLanguageTag(firstPart)) {
					localStorage.setItem("language", firstPart);
					conditionallyRedirectTo(firstPart);
				} else {
					conditionallyRedirectTo();
				}
			} else {
				conditionallyRedirectTo();
			}
		}
	}
};
