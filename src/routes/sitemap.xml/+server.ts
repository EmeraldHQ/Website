import fs from "fs";
import { ROOT_URL } from "$config";

export const prerender = true;

/**
 * Recursively scans the routes directory for routes and their last modified date. Does not include dynamic routes.
 * @param path the path to start scanning for routes from
 * @returns an array of routes and their last modified date
 */
function getRoutes(path: string) {
	const files = fs.readdirSync(path).filter(file => !file.includes("[") && !file.includes("]")); // Filter out dynamic routes
	const routes: { path: string; lastMod: string }[] = [];
	for (const file of files) {
		const filePath = `${path}/${file}`;
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			routes.push(...getRoutes(filePath));
		} else if (file === "+page.svelte") {
			const lastmod = stats.mtime.toISOString().split("T")[0];
			const path = filePath.replace("src/routes", "").replace("/+page.svelte", "");
			routes.push({ path, lastMod: lastmod });
		}
	}
	return routes;
}

const routes = getRoutes("src/routes").map(route => {
	return {
		...route,
		// Set the priority of the homepage to 1. All other pages are 0.7, unless they have been modified in the last 7 days, in which case they are 0.8
		priority:
			route.path === ""
				? 1
				: new Date(route.lastMod).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
				? 0.8
				: 0.7,
		// Set the change frequency to weekly, unless the page has not been modified in the last month, in which case it is monthly
		changeFreq:
			new Date(route.lastMod).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
				? "weekly"
				: "monthly"
	};
});

export async function GET() {
	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
        ${routes
					.map(route =>
						`
                        <url>
                            <loc>${ROOT_URL}${route.path}</loc>
                            <lastmod>${route.lastMod}</lastmod>
                            <changefreq>${route.changeFreq}</changefreq>
                            <priority>${route.priority}</priority>
                        </url>
                        `.trim()
					)
					.join("\n")}
        </urlset>`.trim(),
		{
			headers: {
				"Content-Type": "application/xml"
			}
		}
	);
}
