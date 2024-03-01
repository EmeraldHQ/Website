import type { LayoutLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { MetaTagsProps } from "svelte-meta-tags";
import { browser } from "$app/environment";
import {
	availableLanguageTags,
	isAvailableLanguageTag,
	sourceLanguageTag
} from "$paraglide/runtime";
import { i18n } from "$utils/inlang";
import * as m from "$paraglide/messages";

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

	const baseMetaTags = {
		titleTemplate: "%s | Emerald Studio",
		get description() {
			return this.twitter?.description;
		},
		canonical: url.href,
		openGraph: {
			images: [
				{
					url: `${url.origin}/${m.homeOgBanner(undefined, {
						languageTag: i18n.getLanguageFromUrl(url)
					})}`,
					width: 512,
					height: 256,
					alt: m.a11yAltOgBanner(undefined, {
						languageTag: i18n.getLanguageFromUrl(url)
					})
				}
			],
			siteName: "Emerald Studio"
		},
		twitter: {
			cardType: "summary_large_image",
			// site: "@EmeraldStudio" // Someday
			description: m.homeDescription(undefined, {
				languageTag: i18n.getLanguageFromUrl(url)
			}),
			image: `${url.origin}/${m.homeOgBanner(undefined, {
				languageTag: i18n.getLanguageFromUrl(url)
			})}`,
			imageAlt: m.a11yAltOgBanner(undefined, {
				languageTag: i18n.getLanguageFromUrl(url)
			})
		},
		additionalRobotsProps: {
			noarchive: true
		}
	} as const satisfies MetaTagsProps;

	const baseSchemas = [
		{
			"@type": "Organization",
			url: url.origin,
			logo: `${url.origin}/favicon.svg`
		} /*,
		// Add FAQ?
		{
			"@type": "WebSite",
			url: ROOT_URL,
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: `${ROOT_URL}/search?q={search_term_string}`
				},
				"query-input": "required name=search_term_string"
			}
		}*/
	];

	return {
		baseMetaTags,
		baseSchemas
	};
};
