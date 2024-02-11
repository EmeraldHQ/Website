import type { PageLoad } from "./$types";
import { i18n } from "$utils/inlang";
import * as m from "$paraglide/messages";

export const load: PageLoad = ({ url }) => {
	return {
		pageTitle: m.contactPageTitle(undefined, {
			languageTag: i18n.getLanguageFromUrl(url)
		}),
		pageSchemas: [
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: m.commonPagesHome(undefined, {
							languageTag: i18n.getLanguageFromUrl(url)
						}),
						item:
							url.origin + i18n.resolveRoute("/", i18n.getLanguageFromUrl(url)).replace(/\/$/, "") // there must be a better way
					},
					{
						"@type": "ListItem",
						position: 2,
						name: m.contactPageTitle(undefined, {
							languageTag: i18n.getLanguageFromUrl(url)
						}),
						item: url.href
					}
				]
			}
		],
		contact: {
			name: "Reuben HATTAB",
			phone: "+33 6 48 75 08 97"
		}
	};
};
