import type { RequestHandler } from "./$types";
import { ROOT_URL } from "$config";

export const prerender = true;

export const GET: RequestHandler = () => {
	return new Response(
		["User-agent: *", "Allow: /", "", `Sitemap: ${ROOT_URL}/sitemap.xml`].join("\n"),
		{
			headers: {
				"Content-Type": "text/plain"
			}
		}
	);
};
