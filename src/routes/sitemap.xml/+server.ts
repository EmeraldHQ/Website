import type { RequestHandler } from "./$types";
import { ROOT_URL } from "$config";
import { response } from "super-sitemap";

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await response({
		origin: ROOT_URL,
		lang: {
			default: "en",
			alternates: ["fr"] // currently doesn't support Inlang (https://github.com/jasongitmail/super-sitemap/issues/24)
		}
	});
};
