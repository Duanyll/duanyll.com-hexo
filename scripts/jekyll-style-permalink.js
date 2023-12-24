/**
 * 转换 permalink 以符合 jekyll 风格，移除多余的日期
 * 
 * /2020/5/5/2020-5-5-Derivative => /2020/5/5/Derivative
 */
hexo.extend.filter.register('post_permalink', function (data) {
    data = data.replace(/[^/]*\d{4}-\d{1,2}-\d{1,2}-/, '');
    return data;
});