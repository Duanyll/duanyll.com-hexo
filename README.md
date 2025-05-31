# duanyll.com-hexo

[![Hexo build](https://github.com/Duanyll/duanyll.com-hexo/actions/workflows/hexo.yml/badge.svg)](https://github.com/Duanyll/duanyll.com-hexo/actions/workflows/hexo.yml) [![pages-build-deployment](https://github.com/Duanyll/duanyll.com-hexo/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Duanyll/duanyll.com-hexo/actions/workflows/pages/pages-build-deployment)

Duanyll's new blog, can be visited at [duanyll.com](https://duanyll.com). Also refer to [the post](https://duanyll.com/2023/2/10/Migrate-To-Hexo/) about implementation of this site.

To build this site, you have to

1. Clone the repository
2. Install Pandoc into the path
3. Run `yarn`
4. Run `yarn build`

And the static site will be inside the `public` folder.

## Markdown Writing Extensions

This site uses some extensions to the Markdown syntax, based on the [Pandoc Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown). Here are the list of exclusive extensions:

### Math Marcos

[.vscode\settings.json](.vscode/settings.json) and [_config.yml](_config.yml) contains lots of math marcos to make writing math easier. [.vscode\settings.json](.vscode/settings.json) defines marcos for KaTeX rendering in [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) VSCode extension, while [_config.yml](_config.yml) defines marcos for MathJax rendering in Hexo. All maths are rendered to SVGs at build time and embedded in the HTML. This wastes bandwidth but actually makes the site faster than rendering math on the client side.

### URL Conversion

Markdown links (`[alt text](url)` syntax) referring to other markdown files will be converted to correct URLs. To trigger the conversion, the URL should begin with `/` (relative to project root) or `./` (relative to current directory). For example, `[link text](/source/_posts/oi/2018-10-16-Simulate-Anneal.md)` will be converted to `/2018/10/16/Simulate-Anneal/`. This allows to navigate to other posts within Visual Studio Code.

### Figure Captions

Markdown images (`![alt text](url)` syntax) will have `alt text` displayed as a caption below the image. This is implemented by converting the image to a liquid tag before rendering with Pandoc. However, this may cause trouble with nested liquid tags, for example, in `{% swiper %}` tags. In this case, use the below syntax to enforce standard Markdown rendering:

```
{% swiper width:max effect:cards/coverflow %}

![> ](https://img.duanyll.com/img/20241106161005.png)

![> ](https://img.duanyll.com/img/20241106160940.png)

![> ](https://img.duanyll.com/img/20241106160953.png)

{% endswiper %}
```

### TikzJax Graphics

This site supports rendering TikZ graphics using TikzJax running on server side. To use this feature, use the Pandoc Markdown syntax of inserting raw LaTeX code:

`````
```{=latex}
\begin{tikzpicture}
\draw (0,0) -- (1,1);
\end{tikzpicture}
```
`````

## PDF Export

This site supports exporting posts to PDF files via Pandoc and LaTeX. All above Markdown extensions are supported in the PDF export. To export a post to PDF, run the following command:

```bash
yarn make-pdf source/_posts/your-post.md
```