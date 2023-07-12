---
title: 关于迁移到 Hexo 的技术说明
tags:
- 公告
---

前几天把本站从 Jekyll 迁移到了 Hexo, 原先的网站部署在 [archive-2023.duanyll.com](https://archive-2023.duanyll.com) 下面说明迁移过程的一些技术问题以供参考.

<!-- more -->

## 放弃 Jekyll 的原因

![烂掉的公式](https://cdn.duanyll.com/img/20230210162817.png)

1. 公式渲染问题: 最近上传了几篇课程速通类型的笔记, 内含大量的复杂数学公式. Jekyll 生成器不具备识别 `$` 和 `$$` 定界符的能力, 对于包含 `*` 和 `|` 等特殊 Markdown 字符的公式, 会被优先识别成斜体和表格, 使得前端 MathJax 无法渲染. 另外, 使用 `pix2tex` 等程序生成的公式可能含有嵌套的大括号 `{{}}`, 会被 Liquid 模版转义.
2. Ruby 环境问题: 我不熟悉 Ruby 语言, 安装 Jekyll 的 Gem 包出了很多锅.
3. 主题: 原来的主题看腻了, 而且还有一些错位的 Bug, 响应式完全是烂的, 好看的 Jekyll 主题不多.
4. 很早以前 GitHub Pages 仅支持在线构建 Jekyll (而且不支持插件), 后来通过 GitHub Actions 机制来生成 Pages 后, Jekyll 就失去独占优势了.

## 为什么不选择 Hugo

Hugo 构建的速度的确远快于 Hexo, 并且官网主题库的质量一眼高于 Hexo (尤其是极简风格主题). 但是 Hexo 使用内置的 GoldMark 解析器, 默认配置下后端不支持 `$` 公式, 会导致同样的问题, 若要使用 GoldMark 插件解析公式, 则需要重新编译 Hexo 可执行文件, 不利于 CI. Hexo 基于 Node, 走投无路了大力 `patch-package` 改包也算是比较优雅的方案, 而且在不改包的情况下也能通过 Node API 实现丰富的自定义功能.

## 目前的解决方案

### 主题和插件

- [`hexo-theme-cactus`](https://github.com/probberechts/hexo-theme-cactus) 优质的极简风格主题
- `hexo-filter-mathjax` 和 `hexo-renderer-pandoc`: 调用 Pandoc 解析 Markdown, 并在生成时利用 MathJax 将公式渲染为 SVG 并嵌入 HTML 中. 默认的 `hexo-renderer-marked` 同样难以处理复杂公式的情况.
- `hexo-generator-feed`: 生成 RSS 订阅
- `hexo-generator-search`: 生成文章列表索引文件以便搜索 (目前似乎有锅)
- `hexo-generator-sitemap`: 生成 Google Sitemap
- `hexo-generator-category`: 生成文章分类目录

### 脚本

将脚本放入 `scripts` 文件夹, 就会在 Hexo 生成时执行.

```js
const path = require('path');
const moment = require('moment');

const RE_FILENAME = /^(\d{4}-\d{1,2}-\d{1,2})-(.*)$/;

const categoryMap = {
    course: '课程',
    literature: '文字',
    oi: 'OI',
    old: '存档',
    project: '项目',
    tech: '技术'
};

/**
 * 从文件名中读取文章发表日期，从所在文件夹中读取文章所属分类
 * 
 * source/_posts/course/2020-5-5-Derivative.md
 * 
 * 设置日期为 2020-5-5，分类为课程
 */
hexo.extend.filter.register('before_post_render', async data => {
    if (data.layout === 'post') {
        const filename = path.basename(data.source, path.extname(data.source));
        const matches = filename.match(RE_FILENAME);

        if (matches) {
            data.date = moment(matches[1], 'YYYY-M-D');
            data.title || (data.title = matches[2]);
        }

        const dirname = path.basename(path.dirname(data.source));
        if (dirname in categoryMap) {
            await data.setCategories([categoryMap[dirname]]);
        }
    }
    return data;
});

/**
 * 转换 permalink 以符合 jekyll 风格，移除多余的日期
 * 
 * /2020/5/5/2020-5-5-Derivative => /2020/5/5/Derivative
 */
hexo.extend.filter.register('post_permalink', function (data) {
    return data.replace(/[^/]*\d{4}-\d{1,2}-\d{1,2}-/, '');
});
```

### 图床

原先用 sm.ms 免费图床, 总是感觉不靠谱 (虽然到现在还没出过什么大问题), 现在用阿里云 OSS 香港区做图床, 有 5GB 免费容量和每月 5GB 免费流量, 再套一层 Cloudflare, 够用很久了. 没用 Backblaze 主要是因为 `vs-picgo` 默认不支持, 不太方便.

### GitHub Actions

```yaml
name: Hexo build

on:
  push:
    branches:
      - master # default branch

jobs:
  pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: recursive
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: "16"
      - uses: awalsh128/cache-apt-pkgs-action@latest
        with:
          packages: pandoc
          version: 1.0
      - name: Run install
        uses: borales/actions-yarn@v4
        with:
          cmd: install
      - name: Run build
        uses: borales/actions-yarn@v4
        with:
          cmd: build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```