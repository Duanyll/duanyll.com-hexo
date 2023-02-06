// 转换 permalink 以符合 jekyll 风格，移除多余的日期
hexo.extend.filter.register('post_permalink', function (data) {
    return data.replace(/[^/]*\d{4}-\d{1,2}-\d{1,2}-/, '');
});