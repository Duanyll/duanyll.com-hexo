// This script finds images in markdown files that are not hosted on Aliyun OSS and uploads them to the OSS bucket.

const glob = require("glob");
const fs = require("fs-extra");
const prompt = require("prompt-sync")();
const OSS = require("ali-oss");
const fetch = require("node-fetch");

// Prompt the user for Aliyun OSS credentials
const region = prompt("Region: ");
const accessKeyId = prompt("AccessKeyId: ");
const accessKeySecret = prompt("AccessKeySecret: ");
const bucket = prompt("Bucket: ");

// Initialize OSS client
const client = new OSS({
  region,
  accessKeyId,
  accessKeySecret,
  bucket,
});

// Regex to find markdown images
const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

// Helper function to upload image to OSS
async function uploadToOSS(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${imageUrl}, status: ${response.status}`
      );
    }

    const buffer = await response.buffer();
    const imageName = path.basename(imageUrl);
    const ossKey = `img/${imageName}`; // Store under 'img/' folder

    const result = await client.put(ossKey, buffer);
    console.log(`Uploaded ${imageUrl} to ${result.url}`);
    return `https://img.duanyll.com/${ossKey}`; // Return formatted link
  } catch (err) {
    console.error(`Error fetching or uploading image ${imageUrl}:`, err);
    return null;
  }
}

// Process markdown files
async function processMarkdownFiles() {
  // Use glob to find all markdown files
  const files = glob.sync("**/*.md");

  for (const file of files) {
    let content = await fs.readFile(file, "utf8");
    let modified = false;

    // Collect all matches for images
    const matches = [...content.matchAll(imageRegex)];

    // Iterate over found images
    for (const match of matches) {
      const [fullMatch, altText, imageUrl] = match;

      if (!imageUrl.startsWith("https://img.duanyll.com/img")) {
        console.log(`Processing image: ${imageUrl}`);

        // Upload image to OSS and get the new URL
        const ossUrl = await uploadToOSS(imageUrl);

        if (ossUrl) {
          // Replace the link in the content
          content = content.replace(fullMatch, `![${altText}](${ossUrl})`);
          modified = true;
        } else {
          console.log(`Keeping original link for: ${imageUrl}`);
        }
      }
    }

    // Save the file only if modifications were made
    if (modified) {
      await fs.writeFile(file, content, "utf8");
      console.log(`Updated links in ${file}`);
    }
  }
}

processMarkdownFiles().catch((err) =>
  console.error("Error processing markdown files:", err)
);
