/**
 * Replaces all cross-references in the post with the actual link.
 * 
 * [Derivative](/source/_posts/course/2020-5-5-Derivative.md#三次函数) => [Derivative](/2020/05/05/Derivative/#三次函数)
 */
const RE_FIND = /\[([^\]]+)\]\(\/source\/_posts\/[^\/]+\/(\d{4})-(\d{1,2})-(\d{1,2})-([^.]+).md(|#[^\)]+)\)/g;
const RE_REPLACE = '[$1](/$2/$3/$4/$5/$6)';
const RE_PAD_MONTH = /(\[[^\]]+\]\(\/\d{4}\/)(\d)(\/[^\)]+\))/g;
const RE_PAD_DAY = /(\[[^\]]+\]\(\/\d{4}\/\d{2}\/)(\d)(\/[^\)]+\))/g;
const RE_REPLACE_PAD = '$10$2$3';

hexo.extend.filter.register('before_post_render', async data => {
    if (data.layout === 'post') {
        data.content = data.content.replace(RE_FIND, RE_REPLACE).replace(RE_PAD_MONTH, RE_REPLACE_PAD).replace(RE_PAD_DAY, RE_REPLACE_PAD);
    }
    return data;
})  