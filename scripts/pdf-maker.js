const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');
const child_process = require('child_process');
const path = require('path');
const moment = require('moment');

function makePreamble(outDir, hexoConfigFile = '_config.yml') {
    const hexoConfig = yaml.load(fs.readFileSync(hexoConfigFile, 'utf8'));
    /**
     * @type {Object<string, string>} marcos
     */
    const additionalPackages = ['tikz', 'pgfplots', 'tcolorbox', 'ctex'].map(pkg => `\\usepackage{${pkg}}`).join('\n');
    const tcbLibraries = ['breakable'].map(lib => `\\tcbuselibrary{${lib}}`).join('\n');
    const mathMacros = _.map(hexoConfig.mathjax?.extension_options?.macros, (def, name) => {
        const body = _.isArray(def) ? `{\\${name}}[${def[1]}]{${def[0]}}` : `{\\${name}}{${def}}`;
        return `\\providecommand{\\${name}}{}\\renewcommand${body}`;
    }).join('\n');
    const extraMacros = [
        // Pandoc generate `\[` and `\]` for math block, but we want numbered equations
        `\\renewcommand{\\[}{\\begin{equation}}`,
        `\\renewcommand{\\]}{\\end{equation}}`, 
    ].join('\n');
    fs.writeFileSync(path.join(outDir, 'preamble.tex'), [additionalPackages, tcbLibraries].join('\n'));
    fs.writeFileSync(path.join(outDir, 'macros.tex'), [mathMacros, extraMacros].join('\n'));
}

function getGitUpdatedTime(filepath) {
    const cmd = `git log -1 --pretty=format:%cI ${filepath}`;
    const stdout = child_process.execSync(cmd);
    const result = moment(stdout.toString().trim());
    if (result.isValid()) {
        return result;
    } else {
        return null;
    }
}

function retriveDateFromFilename(filename) {
    const RE_FILENAME = /^(\d{4}-\d{1,2}-\d{1,2})-(.*)$/;
    const basename = path.basename(filename, path.extname(filename));
    const match = basename.match(RE_FILENAME);
    if (!match) {
        return getGitUpdatedTime(filename) || moment();
    } else {
        return moment(match[1], 'YYYY-M-D');
    }
}

/**
 * Transform Markdown for Pandoc latex conversion
 * @param {string} mdText Input Markdown Text
 */
function preprocessMarkdown(inFile, hexoConfigFile = '_config.yml') {
    let mdText = fs.readFileSync(inFile, 'utf8');
    const hexoConfig = yaml.load(fs.readFileSync(hexoConfigFile, 'utf8'));

    // Handle YAML front matter
    const frontMatter = mdText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    const data = frontMatter ? yaml.load(frontMatter[1]) : {};
    _.defaults(data, { author: hexoConfig.author, date: retriveDateFromFilename(inFile).format('YYYY-MM-DD') });
    if (data.nopdf) {
        console.log(`Skip PDF generation for ${inFile}`);
        return '';
    }
    mdText = mdText.replace(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/, "");
    mdText = `---\n${yaml.dump(data)}---\n${mdText}`;

    // {% link url [otheroptions] %}
    mdText = mdText.replace(/{%\s*link\s*(.*?)\s.*%}/g, (__, url) => `[${url}](${url})`);
    // {% folding [options] %}
    mdText = mdText.replace(/{%\s*folding\s*(.*?)\s.*%}/g, (__, options) => {
        const title = _.filter(_.split(options, ' '), !_.includes(['open', 'close'])).map(_.trim).join(' ');
        return "```{=latex}\n" + `\\begin{tcolorbox}[breakable, title=${title}]\n` + "```";
    });
    // {% endfolding %}
    mdText = mdText.replace(/{%\s*endfolding\s*%}/g, "```{=latex}\n\\end{tcolorbox}\n```");

    // if the document does not contain h1, replace all h2 -> h1, h3 -> h2, ...
    if (!mdText.match(/^# /m)) {
        mdText = mdText.replace(/^## /gm, '# ');
        mdText = mdText.replace(/^### /gm, '## ');
        mdText = mdText.replace(/^#### /gm, '### ');
        mdText = mdText.replace(/^##### /gm, '#### ');
        mdText = mdText.replace(/^###### /gm, '##### ');
    }

    return mdText;
}

function makePdf(inputMdFile, outputPdfFile, tempDir = 'temp') {
    // Create temporary directory if not exists
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    makePreamble(tempDir);
    // Create the preamble file if not exists
    const preambleFile = `${tempDir}/preamble.tex`;
    const macrosFile = `${tempDir}/macros.tex`;
    // Create the temporary markdown file
    const tempMdFile = `${tempDir}/temp.md`;
    fs.writeFileSync(tempMdFile, preprocessMarkdown(inputMdFile));
    // Create the temporary media directory
    const tempMediaDir = `${tempDir}/media`;
    if (!fs.existsSync(tempMediaDir)) {
        fs.mkdirSync(tempMediaDir);
    }
    // Run pandoc
    const flags = [
        `--pdf-engine=latexmk`,
        `--pdf-engine-opt=-outdir=${tempDir}`,
        `--pdf-engine-opt=-xelatex`,
        `-V geometry:margin=1in`,
        `--include-in-header=${preambleFile}`,
        `--include-before-body=${macrosFile}`,
        `--extract-media=${tempMediaDir}`,
        `--number-sections`
    ];
    const command = `pandoc -s ${tempMdFile} -o ${outputPdfFile} ${flags.join(' ')}`;
    console.log(command);
    // child_process.execSync(command);
    try {
        child_process.execSync(command);
    } catch (e) {
        console.error(e.toString());
    }
}

if (require.main === module) {
    makePdf(process.argv[2], process.argv[3]);
}