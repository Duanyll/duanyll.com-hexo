const fs = require('fs/promises');
const promisify = require('util').promisify;
const glob = promisify(require('glob'));
const os = require('os');

function processPost(text) {
    // Find one source link in yaml front matter
    const regex = /source: ([^\n]*)/g;
    const source = regex.exec(text);
    if (source) {
        const sourceLink = source[1].trim();
        // Find the end of yaml front matter
        const endTag = `---${os.EOL}`
        const endOfYaml = text.indexOf(endTag, source.index);
        // Insert the link as swig tag after the yaml front matter
        // ---
        // 
        // {% link sourceLink desc:true %}
        // 
        // (rest of the post)
        return text.slice(0, endOfYaml + endTag.length)
            + `${os.EOL}{% link ${sourceLink} desc:true %}${os.EOL}`
            + text.slice(endOfYaml + endTag.length);
    }
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