/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		if (path === "/") {
			// Redirect to the homepage
			return Response.redirect("https://duanyll.com", 301);
		}

		if (path === "/favicon.ico") {
			return fetch("https://cdn.duanyll.com/favicon.ico");
		}

		if (!path.startsWith("/img/")) {
			return new Response("Not found", { status: 404 });
		}
		
		const destUrl = `https://cdn.duanyll.com${path}`;
		const cf: RequestInitCfProperties = {};
		if (!url.searchParams.has("orig")) {
			cf.image = {
				width: 1920,
				fit: "scale-down",
				metadata: "none",
			};

			const platform = request.headers.get("Sec-CH-UA-Platform") ?? "";
			if (platform === "iOS" || platform === "Android") {
				cf.image.width = 800;
			}

			const accept = request.headers.get("Accept") ?? "";
			if (/image\/avif/.test(accept)) {
				cf.image.format = 'avif';
			} else if (/image\/webp/.test(accept)) {
				cf.image.format = 'webp';
			} else {
				cf.image.format = 'jpeg';
			}
		}

		const imageRequest = new Request(destUrl, { cf });
		const response = await fetch(imageRequest);
		if (response.ok || response.redirected) {
			return response;
		} else {
			console.error(`Failed to fetch image: ${destUrl}`);
			return fetch(destUrl);
		}
	},
} satisfies ExportedHandler<Env>;
