/**
 * Replaces all cross-references in the post with the actual link.
 *
 * [Derivative](/source/_posts/course/2020-5-5-Derivative.md#三次函数) => [Derivative](/2020/05/05/Derivative/#三次函数)
 */

hexo.extend.filter.register("before_post_render", async (data) => {
  if (data.layout === "post") {
    data.content = data.content
      .replace(
        /\[([^\]]+)\]\((?:\/source\/_posts\/[^\/]+|.|..\/[^\/]+)\/(\d{4})-(\d{1,2})-(\d{1,2})-([^.]+).md(|#[^\)]+)\)/g,
        "[$1](/$2/$3/$4/$5/$6)"
      )
      .replace(/(\[[^\]]+\]\(\/\d{4}\/)(\d)(\/[^\)]+\))/g, "$10$2$3")
      .replace(/(\[[^\]]+\]\(\/\d{4}\/\d{2}\/)(\d)(\/[^\)]+\))/g, "$10$2$3");
  }
  return data;
});
