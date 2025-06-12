// This script converts Markdown files to PDF using Pandoc and LaTeX

const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");
const child_process = require("child_process");
const path = require("path");
const moment = require("moment");
const { Command } = require("commander");

function makePreamble(outDir, hexoConfigFile = "_config.yml") {
  const hexoConfig = yaml.load(fs.readFileSync(hexoConfigFile, "utf8"));
  /**
   * @type {Object<string, string>} marcos
   */
  const additionalPackages = ["tikz", "pgfplots", "tcolorbox", "ctex"]
    .map((pkg) => `\\usepackage{${pkg}}`)
    .join("\n");
  const tcbLibraries = ["breakable"]
    .map((lib) => `\\tcbuselibrary{${lib}}`)
    .join("\n");
  const mathMacros = _.map(
    hexoConfig.mathjax?.extension_options?.macros,
    (def, name) => {
      const body = _.isArray(def)
        ? `{\\${name}}[${def[1]}]{${def[0]}}`
        : `{\\${name}}{${def}}`;
      return `\\providecommand{\\${name}}{}\\renewcommand${body}`;
    }
  ).join("\n");
  const extraMacros = [
    // Pandoc generate `\[` and `\]` for math block, but we want numbered equations
    `\\renewcommand{\\[}{\\begin{equation}}`,
    `\\renewcommand{\\]}{\\end{equation}}`,
  ].join("\n");
  fs.writeFileSync(
    path.join(outDir, "preamble.tex"),
    [additionalPackages, tcbLibraries].join("\n")
  );
  fs.writeFileSync(
    path.join(outDir, "macros.tex"),
    [mathMacros, extraMacros].join("\n")
  );
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
    return moment(match[1], "YYYY-M-D");
  }
}

/**
 * Transform Markdown for Pandoc latex conversion
 * @param {string} mdText Input Markdown Text
 */
function preprocessMarkdown(inFile, hexoConfigFile = "_config.yml") {
  let mdText = fs.readFileSync(inFile, "utf8");
  const hexoConfig = yaml.load(fs.readFileSync(hexoConfigFile, "utf8"));

  // Handle YAML front matter
  const frontMatter = mdText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const data = frontMatter ? yaml.load(frontMatter[1]) : {};
  _.defaults(data, {
    author: hexoConfig.author,
    date: retriveDateFromFilename(inFile).format("YYYY-MM-DD"),
  });
  if (data.nopdf) {
    console.log(`Skip ${inFile} due to nopdf flag`);
    return "";
  }
  mdText = mdText.replace(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/, "");
  mdText = `---\n${yaml.dump(data)}---\n${mdText}`;

  // {% link url [otheroptions] %}
  mdText = mdText.replace(
    /{%\s*link\s*(.*?)\s.*%}/g,
    (__, url) => `[${url}](${url})`
  );
  // {% folding title [options] %}
  mdText = mdText.replace(/{%\s*folding\s*(.*?)\s.*%}/g, (__, options) => {
    const title = _.filter(
      _.split(options, " "),
      !_.includes(["open", "close"])
    )
      .map(_.trim)
      .join(" ");
    return (
      "```{=latex}\n" +
      `\\begin{tcolorbox}[breakable, title=${title}]\n` +
      "```"
    );
  });
  // {% endfolding %}
  mdText = mdText.replace(
    /{%\s*endfolding\s*%}/g,
    "```{=latex}\n\\end{tcolorbox}\n```"
  );
  // {% box title [color:color] %}
  mdText = mdText.replace(/{%\s*box\s*(.*?)\s.*%}/g, (__, options) => {
    const parts = _.split(options, " ");
    const title = parts[0];
    const color = _.find(parts, (p) => p.startsWith("color:"));
    const colorOption = color ? `colback=${color.split(":")[1]}` : "";
    return (
      "```{=latex}\n" +
      `\\begin{tcolorbox}[breakable, title=${title}, ${colorOption}]\n` +
      "```"
    );
  });
  // {% endbox %}
  mdText = mdText.replace(/{%\s*endbox\s*%}/g, () => {
    return (
      "```{=latex}\n\\end{tcolorbox}\n```"
    );
  });

  // Handle the ![> ]() syntax
  mdText = mdText.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    if (alt.startsWith("> ")) {
      alt = alt.slice(2);
    }
    return `![${alt}](${url})`;
  });

  // Strip all other {% ... %} tags
  mdText = mdText.replace(/{%\s*.*\s*%}/g, "");

  // if the document does not contain h1, replace all h2 -> h1, h3 -> h2, ...
  if (!mdText.match(/^# /m)) {
    mdText = mdText.replace(/^## /gm, "# ");
    mdText = mdText.replace(/^### /gm, "## ");
    mdText = mdText.replace(/^#### /gm, "### ");
    mdText = mdText.replace(/^##### /gm, "#### ");
    mdText = mdText.replace(/^###### /gm, "##### ");
  }

  return mdText;
}

function makePdf(inputMdFile, outputPdfFile, options = {}) {
  const {
    tempDir = ".cache/pdf",
    configFile = "_config.yml",
    verbose = false,
    dryRun = false
  } = options;

  if (verbose) {
    console.log(`📝 Converting: ${inputMdFile}`);
    console.log(`📄 Output: ${outputPdfFile}`);
    console.log(`🗂️  Temp directory: ${tempDir}`);
  }

  // If the output directory does not exist, create it
  if (!fs.existsSync(path.dirname(outputPdfFile))) {
    fs.mkdirSync(path.dirname(outputPdfFile), { recursive: true });
    if (verbose) console.log(`📁 Created output directory: ${path.dirname(outputPdfFile)}`);
  }
  // Create temporary directory if not exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    if (verbose) console.log(`📁 Created temp directory: ${tempDir}`);
  }
  
  if (verbose) console.log("🔧 Generating LaTeX preamble and macros...");
  makePreamble(tempDir, configFile);
  
  // Create the preamble file if not exists
  const preambleFile = `${tempDir}/preamble.tex`;
  const macrosFile = `${tempDir}/macros.tex`;
  
  // Create the temporary markdown file
  const tempMdFile = `${tempDir}/temp.md`;
  if (verbose) console.log("🔄 Preprocessing Markdown...");
  const processedMd = preprocessMarkdown(inputMdFile, configFile);
  
  if (processedMd === "") {
    console.log("⏭️  Skipping file due to nopdf flag");
    return;
  }
  
  fs.writeFileSync(tempMdFile, processedMd);
  
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
    `--number-sections`,
  ];
  const command = `pandoc -s ${tempMdFile} -o ${outputPdfFile} ${flags.join(" ")}`;
  
  if (verbose || dryRun) {
    console.log("🔨 Pandoc command:");
    console.log(command);
  }
  
  if (dryRun) {
    console.log("🚫 Dry run mode - not executing command");
    return;
  }
  
  try {
    if (verbose) console.log("🚀 Running pandoc...");
    child_process.execSync(command);
    console.log(`✅ PDF generated successfully: ${outputPdfFile}`);
  } catch (e) {
    console.error("❌ Error generating PDF:");
    console.error(e.toString());
    process.exit(1);
  }
}

if (require.main === module) {
  const program = new Command();

  program
    .name('pdf-maker')
    .description('Convert Markdown files to PDF using Pandoc and LaTeX')
    .version('1.0.0')
    .argument('<input>', 'Input Markdown file path')
    .argument('[output]', 'Output PDF file path (optional)')
    .option('-t, --temp-dir <dir>', 'Temporary directory for processing', '.cache/pdf')
    .option('-c, --config <file>', 'Hexo config file path', '_config.yml')
    .option('-v, --verbose', 'Enable verbose output', false)
    .option('-n, --dry-run', 'Show command without executing', false)
    .helpOption('-h, --help', 'Display help for command')
    .addHelpText('after', `
Examples:
  $ node pdf-maker.js input.md                    # Convert to pdf/input.pdf
  $ node pdf-maker.js input.md output.pdf         # Convert to specific output
  $ node pdf-maker.js input.md -v                 # Verbose output
  $ node pdf-maker.js input.md -n                 # Dry run (show command only)
  $ node pdf-maker.js input.md -t /tmp/pdf        # Use custom temp directory
  $ node pdf-maker.js input.md -c my-config.yml   # Use custom config file

Dependencies:
  This tool requires pandoc and latexmk to be installed and available in PATH.
    `)
    .action((input, output, options) => {
      // Validate input file
      if (!fs.existsSync(input)) {
        console.error(`❌ Error: Input file does not exist: ${input}`);
        process.exit(1);
      }

      if (!input.endsWith('.md')) {
        console.error(`❌ Error: Input file must be a Markdown file (.md): ${input}`);
        process.exit(1);
      }

      // Validate config file
      if (!fs.existsSync(options.config)) {
        console.error(`❌ Error: Config file does not exist: ${options.config}`);
        process.exit(1);
      }

      // Generate output path if not provided
      const outputPath = output || path.join(
        "pdf",
        path.basename(input, path.extname(input)) + ".pdf"
      );

      // Check if pandoc is available
      try {
        child_process.execSync('pandoc --version', { stdio: 'ignore' });
      } catch (e) {
        console.error('❌ Error: pandoc is not installed or not available in PATH');
        console.error('Please install pandoc from https://pandoc.org/');
        process.exit(1);
      }

      // Check if latexmk is available
      try {
        child_process.execSync('latexmk --version', { stdio: 'ignore' });
      } catch (e) {
        console.error('❌ Error: latexmk is not installed or not available in PATH');
        console.error('Please install a TeX distribution (e.g., TeX Live, MiKTeX)');
        process.exit(1);
      }

      if (options.verbose) {
        console.log('🔍 PDF Maker Configuration:');
        console.log(`   Input: ${input}`);
        console.log(`   Output: ${outputPath}`);
        console.log(`   Config: ${options.config}`);
        console.log(`   Temp Dir: ${options.tempDir}`);
        console.log(`   Verbose: ${options.verbose}`);
        console.log(`   Dry Run: ${options.dryRun}`);
        console.log('');
      }

      // Convert the file
      makePdf(input, outputPath, {
        tempDir: options.tempDir,
        configFile: options.config,
        verbose: options.verbose,
        dryRun: options.dryRun
      });
    });

  program.parse();
}
