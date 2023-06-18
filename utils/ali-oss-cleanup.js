const oss = require('ali-oss');
const prompt = require('prompt-sync')();
const fs = require('fs/promises');
const promisify = require('util').promisify;
const glob = promisify(require('glob'));

const region = prompt('Region: ');
const accessKeyId = prompt('AccessKeyId: ');
const accessKeySecret = prompt('AccessKeySecret: ');
const bucket = prompt('Bucket: ');

const client = new oss({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
});

async function listReferencedImages() {
    // List all markdown files in source/ recursively
    const markdownFiles = await glob('source/**/*.md');
    const images = new Set();
    await Promise.all(markdownFiles.map(async file => {
        const content = await fs.readFile(file, 'utf-8');
        // Match links like https://cdn.duanyll.com/img/20230405135624.png, and extract the image name
        const regex = /https:\/\/cdn.duanyll.com\/img\/([a-zA-Z0-9.-]+)/g;
        let match;
        while (match = regex.exec(content)) {
            images.add(match[1]);
        }
    }));
    return images;
}

async function listOssImages() {
    let continuationToken = null;
    const images = new Set();
    const maxKeys = 50;
    do {
        const result = await client.listV2({
            prefix: 'img/',
            'max-keys': maxKeys,
            'continuation-token': continuationToken
        });
        continuationToken = result.nextContinuationToken;
        result.objects.forEach(object => {
            images.add(object.name.split('/')[1]);
        })
    } while (continuationToken);
    return images;
}

async function findUnusedImages() {
    const referencedImages = await listReferencedImages();
    const ossImages = await listOssImages();
    const unusedImages = [];
    ossImages.forEach(image => {
        if (!referencedImages.has(image)) {
            unusedImages.push(image);
        }
    });
    return unusedImages;
}

async function deleteImages(images) {
    await client.deleteMulti(images.map(image => `img/${image}`));
}

async function main() {
    const unusedImages = await findUnusedImages();
    console.log(`Found ${unusedImages.length} unused images:`);
    unusedImages.forEach(image => {
        console.log(image);
    });
    const confirm = prompt('Delete? (y/N) ');
    if (confirm === 'y') {
        await deleteImages(unusedImages);
    }
}

main();