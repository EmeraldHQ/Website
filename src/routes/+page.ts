import type { PageLoad } from "./$types";
import * as m from "$paraglide/messages";
import { i18n } from "$utils/inlang";

export const load: PageLoad = ({ url }) => {
	return {
		pageTitle: m.commonPagesHome(undefined, {
			languageTag: i18n.getLanguageFromUrl(url)
		})
	};
};
