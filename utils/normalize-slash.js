// This script normalizes HTML files in output directories to ensure every link can have a trailing slash

const fs = require("fs");
const path = require("path");

function normalizeHtmlFiles(publicDir = "public") {
  function processDirectory(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        processDirectory(fullPath);
      } else if (
        item.isFile() &&
        item.name.endsWith(".html") &&
        item.name !== "index.html" &&
        item.name !== "404.html"
      ) {
        const fileName = path.parse(item.name).name;
        const newDir = path.join(dir, fileName);
        const newFilePath = path.join(newDir, "index.html");

        // Create the new directory
        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }

        // Move the file
        fs.renameSync(fullPath, newFilePath);
        console.log(`Moved: ${fullPath} -> ${newFilePath}`);
      }
    }
  }

  if (!fs.existsSync(publicDir)) {
    console.error(`Directory ${publicDir} does not exist`);
    return;
  }

  processDirectory(publicDir);
  console.log("HTML file normalization completed");
}

// Run the script if called directly
if (require.main === module) {
  normalizeHtmlFiles();
}

module.exports = normalizeHtmlFiles;
