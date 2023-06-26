hexo.extend.filter.register("before_post_render", async (data) => {
  if (data.layout === "post") {
    data.content = data.content
      // Replaces all cross-references in the post with the actual link.
      .replace(
        /\[([^\]]+)\]\((?:\/source\/_posts\/[^\/]+|.|..\/[^\/]+)\/(\d{4})-(\d{1,2})-(\d{1,2})-([^.]+).md(|#[^\)]+)\)/g,
        "[$1](/$2/$3/$4/$5/$6)"
      )
      .replace(/(\[[^\]]+\]\(\/\d{4}\/)(\d)(\/[^\)]+\))/g, "$10$2$3")
      .replace(/(\[[^\]]+\]\(\/\d{4}\/\d{2}\/)(\d)(\/[^\)]+\))/g, "$10$2$3")
      // Replace markdown image links into {% image href description %} tags.
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "{% image $2 $1 %}")
  }
  return data;
});
