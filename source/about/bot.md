---
title: SiteInfoAPIBot
---

This site uses a custom Cloudflare Worker named **SiteInfoAPIBot** to fetch and parse metadata from external websites. This bot is designed to provide rich link previews when users share URLs on the site.

Currently, the bot identifies itself with the following User-Agent string:

```
Mozilla/5.0 (compatible; SiteInfoAPIBot/1.0; +https://duanyll.com/about/bot)
```

View the [source code on GitHub](https://github.com/duanyll/duanyll.com-hexo/tree/master/workers/site-info) for more details about its implementation and functionality.