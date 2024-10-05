const path = require("path");
const _ = require("lodash");

hexo.extend.filter.register("before_post_render", async (data) => {
  // Replace local links with hexo links
  data.content = data.content.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (match, text, url) => {
    if (url.includes(':')) {
      // url contains protocol
      return match;
    }
    if (url.startsWith('.') || url.startsWith('/')) {
      // url is a link to a local file
      let [file, anchor] = url.split('#');
      if (file.startsWith('.')) {
        const dirname = path.dirname(data.source);
        file = path.join('/source', dirname, file);
      }
      file = file.replace(/\\/g, '/');
      if (file.startsWith('/source/_posts')) {
        let [year, month, day, ...rest] = path.basename(file).split('-');
        month = _.trimStart(month, '0');
        day = _.trimStart(day, '0');
        file = `/${year}/${month}/${day}/${rest.join('-')}`;
      }
      // remove leading /source and trailing .md
      file = file.replace(/^\/source/, '').replace(/\.md$/, '/');
      if (anchor) {
        url += `#${anchor}`;
      }
      return `[${text}](${file})`;
    }
    return match;
  });

  // Convert markdown image to liquid tag
  data.content = data.content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    if (alt.startsWith("> ")) {
      // Extension: Avoid liquid tag generation, keep the image as is
      alt = alt.slice(2);
      return `![${alt}](${url})`;
    } else {
      return `{% image ${url} ${alt} %}`;
    }
  });

  return data;
});
