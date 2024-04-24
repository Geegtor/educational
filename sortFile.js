const fs = require('fs');
const readline = require('readline');
const { PassThrough } = require('stream');
const { promisify } = require('util');
const { pipeline } = require('stream');

const inputFile = 'input.txt';
const outputFile = 'output.txt';
const tempDir = './temp/';

const MAX_MEMORY = 500 * 1024 * 1024;

const readStream = fs.createReadStream(inputFile);
const lineReader = readline.createInterface({
    input: readStream,
    output: new PassThrough(),
});

let lines = [];
let tempFileCounter = 0;

lineReader.on('line', line => {
    lines.push(line);
    if (lines.length * Buffer.byteLength(line) > MAX_MEMORY) {
        lines.sort();
        const tempFileName = `${tempDir}temp_${tempFileCounter++}.txt`;
        fs.writeFileSync(tempFileName, lines.join('\n'));
        lines = [];
    }
});

lineReader.on('close', async () => {
    if (lines.length > 0) {
        lines.sort();
        const tempFileName = `${tempDir}temp_${tempFileCounter++}.txt`;
        fs.writeFileSync(tempFileName, lines.join('\n'));
    }

    const mergeTempFiles = async () => {
        const files = fs.readdirSync(tempDir).map(file => tempDir + file);
        while (files.length > 1) {
            const mergedFiles = [];
            for (let i = 0; i < files.length; i += 2) {
                const file1 = files[i];
                const file2 = files[i + 1];
                const mergedFileName = `${tempDir}temp_${tempFileCounter++}.txt`;
                await mergeFiles(file1, file2, mergedFileName);
                mergedFiles.push(mergedFileName);
            }
            files.splice(0, files.length, ...mergedFiles);
        }
        fs.renameSync(files[0], outputFile);
    };

    const mergeFiles = async (file1, file2, outputFileName) => {
        const readStream1 = fs.createReadStream(file1);
        const readStream2 = fs.createReadStream(file2);
        const writeStream = fs.createWriteStream(outputFileName);

        await promisify(pipeline)(readStream1, readStream2, writeStream);
        fs.unlinkSync(file1);
        fs.unlinkSync(file2);
    };

    await mergeTempFiles();
});
