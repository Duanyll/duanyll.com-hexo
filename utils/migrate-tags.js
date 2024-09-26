const fs = require('fs/promises');
const promisify = require('util').promisify;
const glob = promisify(require('glob'));
const os = require('os');
const yaml = require('js-yaml');
const _ = require('lodash');

function processPost(text) {
    const hasFrontMatter = text.startsWith('---');
    if (!hasFrontMatter) {
        return;
    }
    // Find second `---`
    const endOfFrontMatter = text.indexOf('---', 4);
    const frontMatter = text.slice(4, endOfFrontMatter).trim();
    const content = text.slice(endOfFrontMatter + 3);
    const data = yaml.load(frontMatter);
    if (data.tags) {
        data.tags = _.map(data.tags, _.toLower);
    }
    const newFrontMatter = yaml.dump(data);
    return `---${os.EOL}${newFrontMatter}---${content}`;
}

async function main() {
    const markdownFiles = await glob('source/**/*.md');
    await Promise.all(markdownFiles.map(async file => {
        const content = await fs.readFile(file, 'utf-8');
        const newText = processPost(content);
        if (newText) {
            await fs.writeFile(file, newText);
        }
    }
    ));
}

main();