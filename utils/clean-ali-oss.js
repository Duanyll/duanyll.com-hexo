// This script finds and deletes unreferenced images in an Aliyun OSS bucket.

const oss = require("ali-oss");
const { Command } = require("commander");
const prompt = require("prompt-sync")();
const fs = require("fs/promises");
const promisify = require("util").promisify;
const glob = promisify(require("glob"));

const program = new Command();

program
  .name("clean-ali-oss")
  .description("Find and delete unreferenced images in an Aliyun OSS bucket")
  .version("1.0.0")
  .option("-r, --region <region>", "OSS region", process.env.OSS_REGION)
  .option("-i, --access-key-id <id>", "OSS access key ID", process.env.OSS_ACCESS_KEY_ID)
  .option("-s, --access-key-secret <secret>", "OSS access key secret", process.env.OSS_ACCESS_KEY_SECRET)
  .option("-b, --bucket <bucket>", "OSS bucket name", process.env.OSS_BUCKET)
  .option("-d, --dry-run", "list unused images without deleting", false)
  .option("-y, --yes", "skip confirmation prompt", false)
  .parse();

const options = program.opts();

// Interactive fallback for missing credentials
if (!options.region) {
  options.region = prompt("Region: ");
}
if (!options.accessKeyId) {
  options.accessKeyId = prompt("AccessKeyId: ");
}
if (!options.accessKeySecret) {
  options.accessKeySecret = prompt("AccessKeySecret: ");
}
if (!options.bucket) {
  options.bucket = prompt("Bucket: ");
}

// Validate required options after interactive input
if (!options.region || !options.accessKeyId || !options.accessKeySecret || !options.bucket) {
  console.error("Error: Missing required OSS credentials.");
  process.exit(1);
}

const client = new oss({
  region: options.region,
  accessKeyId: options.accessKeyId,
  accessKeySecret: options.accessKeySecret,
  bucket: options.bucket,
});

async function listReferencedImages() {
  // List all markdown files in source/ recursively
  const markdownFiles = await glob("source/**/*.md");
  const images = new Set();
  await Promise.all(
    markdownFiles.map(async (file) => {
      const content = await fs.readFile(file, "utf-8");
      // Match links like https://img.duanyll.com/img/20230405135624.png, and extract the image name
      const regex = /https:\/\/img.duanyll.com\/img\/([a-zA-Z0-9.-]+)/g;
      let match;
      while ((match = regex.exec(content))) {
        images.add(match[1]);
      }
    })
  );
  return images;
}

async function listOssImages() {
  let continuationToken = null;
  const images = new Set();
  const maxKeys = 50;
  do {
    const result = await client.listV2({
      prefix: "img/",
      "max-keys": maxKeys,
      "continuation-token": continuationToken,
    });
    continuationToken = result.nextContinuationToken;
    result.objects.forEach((object) => {
      images.add(object.name.split("/")[1]);
    });
  } while (continuationToken);
  return images;
}

async function findUnusedImages() {
  const referencedImages = await listReferencedImages();
  const ossImages = await listOssImages();
  const unusedImages = [];
  ossImages.forEach((image) => {
    if (!referencedImages.has(image)) {
      unusedImages.push(image);
    }
  });
  return unusedImages;
}

async function deleteImages(images) {
  if (options.dryRun) {
    console.log("Dry run mode: would delete the following images:");
    images.forEach(image => console.log(`  img/${image}`));
    return;
  }
  await client.deleteMulti(images.map((image) => `img/${image}`));
}

async function main() {
  try {
    console.log(`Scanning for unused images in bucket: ${options.bucket}`);
    const unusedImages = await findUnusedImages();
    console.log(`Found ${unusedImages.length} unused images:`);
    unusedImages.forEach((image) => {
      console.log(`  ${image}`);
    });

    if (unusedImages.length === 0) {
      console.log("No unused images found.");
      return;
    }

    if (options.dryRun) {
      console.log("\nDry run mode - no images will be deleted.");
      await deleteImages(unusedImages);
      return;
    }

    if (!options.yes) {
      const prompt = require("prompt-sync")();
      const confirm = prompt("Delete these images? (y/N) ");
      if (confirm !== "y" && confirm !== "Y") {
        console.log("Operation cancelled.");
        return;
      }
    }

    console.log("Deleting images...");
    await deleteImages(unusedImages);
    console.log("Images deleted successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
