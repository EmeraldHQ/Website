import type { Reroute } from "@sveltejs/kit";
import { i18n } from "$utils/inlang";

export const reroute: Reroute = i18n.reroute();
