import type { Handle } from "@sveltejs/kit";
import { i18n } from "$utils/inlang";

export const handle: Handle = i18n.handle({ langPlaceholder: "%lang%" });
