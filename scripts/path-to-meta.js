const path = require('path');
const moment = require('moment');
const { execSync } = require('child_process');

const RE_FILENAME = /^(\d{4}-\d{1,2}-\d{1,2})-(.*)$/;

const categoryMap = {
    course: '课程',
    literature: '文字',
    oi: 'OI',
    old: '存档',
    project: '项目',
    tech: '技术'
};

function getGitUpdatedTime(filepath) {
    const cmd = `git log -1 --pretty=format:%cI ${filepath}`;
    const stdout = execSync(cmd);
    const result = moment(stdout.toString().trim());
    if (result.isValid()) {
        return result;
    } else {
        return null;
    }
}

/**
 * 从文件名中读取文章发表日期，从所在文件夹中读取文章所属分类
 * 
 * source/_posts/course/2020-5-5-Derivative.md
 * 
 * 设置日期为 2020-5-5，分类为课程
 */
hexo.extend.filter.register('before_post_render', async data => {
    if (data.layout === 'post') {
        const dirname = path.basename(path.dirname(data.source));
        if (dirname in categoryMap) {
            await data.setCategories([categoryMap[dirname]]);
        }

        for (const tag of data.tags.data) {
            data.content = `{% hashtag ${tag.name} ${tag.permalink} %}\n` + data.content;
        }
    }
    return data;
});
