/**
 * Define the structure of the data we want to extract from the site.
 */
interface SiteInfo {
  title?: string;
  desc?: string;
  icon?: string;
  url?: string;
}

/**
 * An HTMLRewriter handler class to collect site metadata.
 */
class ElementHandler {
  public data: SiteInfo;

  constructor() {
    this.data = {};
  }

  // Handle <title> and <meta> tags
  element(element: Element) {
    const { tagName } = element;

    if (tagName === 'meta') {
      const property = element.getAttribute('property');
      const name = element.getAttribute('name');
      const content = element.getAttribute('content');

      if (content) {
        if (property === 'og:title' && !this.data.title) {
          this.data.title = content;
        } else if ((property === 'og:description' || name === 'description') && !this.data.desc) {
          this.data.desc = content;
        } else if ((property === 'og:image' || property === 'twitter:image') && !this.data.icon) {
          this.data.icon = content;
        }
      }
    }
    
    if (tagName === 'link') {
      const rel = element.getAttribute('rel');
      const href = element.getAttribute('href');

      if (href && rel && (rel.includes('icon') || rel.includes('apple-touch-icon'))) {
        // Prioritize apple-touch-icon, then any other icon
        if (rel.includes('apple-touch-icon') || !this.data.icon) {
          this.data.icon = href;
        }
      }
    }
  }

  // Capture text nodes within <title>
  text(text: Text) {
    if (!this.data.title) {
      const value = text.text.trim();
      if (value) {
        this.data.title = value;
      }
    }
  }
}

/**
 * Helper function to generate CORS headers based on allowed hosts.
 */
function getCorsHeaders(request: Request, allowedHosts: string[]): Record<string, string> {
  const origin = request.headers.get('origin');
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (origin) {
    try {
      const originHost = new URL(origin).hostname;
      if (allowedHosts.includes(originHost)) {
        headers['Access-Control-Allow-Origin'] = origin;
      }
    } catch (e) {
      // Invalid origin, skip
    }
  }
  return headers;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    const allowedHosts: string[] = [
      "localhost",
      "127.0.0.1",
      "duanyll.com",
      "www.duanyll.com"
    ];

    // 1. Referer validation
    try {
      const referer = request.headers.get('referer') || '';
      
      if (referer) {
        const refererHost = new URL(referer).hostname;
        if (!allowedHosts.includes(refererHost)) {
          throw new Error(`Referer not allowed: ${refererHost}`);
        }
      }
      // You can add a policy for empty referers here if needed
      
    } catch (error) {
      console.error('Referer check failed:', error);
      return new Response(JSON.stringify({
          title: "访问受限",
          desc: "请自部署该服务或从授权的域名访问。"
      }), { status: 403, headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedHosts) } });
    }

    // 2. URL parameter validation
    if (!targetUrl || !targetUrl.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'A valid "url" query parameter is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedHosts) },
      });
    }
    
    // 3. Use the Caches API
    const cache = caches.default;
    // Use the target URL itself as the cache key
    const cacheKey = new Request(targetUrl, { headers: { 'Accept': 'application/json' } });
    const cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) {
      console.log('Cache HIT for:', targetUrl);
      // For cached responses, we need to add CORS headers; clone and modify
      const response = cachedResponse.clone();
      const newHeaders = new Headers(response.headers);
      Object.entries(getCorsHeaders(request, allowedHosts)).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(response.body, { status: response.status, headers: newHeaders });
    }
    console.log('Cache MISS for:', targetUrl);

    try {
      // 4. Fetch the target website's HTML
      const siteResponse = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SiteInfoAPIBot/1.0; +https://duanyll.com/about/bot)'
        },
        redirect: 'follow', // Automatically follow redirects
      });

      if (!siteResponse.ok) {
        throw new Error(`Failed to fetch: ${siteResponse.status} ${siteResponse.statusText}`);
      }

      const finalUrl = new URL(siteResponse.url);

      // 5. Parse HTML using HTMLRewriter
      const handler = new ElementHandler();
      const rewriter = new HTMLRewriter().on('title, meta, link', handler);
      
      // Transform the response stream to parse it
      await rewriter.transform(siteResponse).arrayBuffer();
      
      let data: SiteInfo = handler.data;

      // 6. Finalize icon URL (make it absolute if it's relative)
      if (data.icon && !/^(https?:)?\/\//.test(data.icon)) {
          data.icon = new URL(data.icon, finalUrl.origin).href;
      }
      data.url = finalUrl.href;

      // 7. Build and cache the JSON response
      const jsonResponse = new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=604800', // Cache on Cloudflare's edge for 1 week
          ...getCorsHeaders(request, allowedHosts),
        },
      });

      ctx.waitUntil(cache.put(cacheKey, jsonResponse.clone()));
      return jsonResponse;

    } catch (error: unknown) {
      console.error('Failed to get site info:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage, url: targetUrl }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedHosts) },
      });
    }
  },
};