import {createGzip, createGunzip} from 'zlib';
import fs from "fs";
import {basename, join} from "path";
import stream from "stream";

const gzip = createGzip();

const compress = async (files) => {
    const [sourceFile, destinationDir] = files.split(' ');
    try {
        const fileName = basename(sourceFile);
        const destinationPath = join(destinationDir, fileName);

        const source = fs.createReadStream(fileName);
        const destination = fs.createWriteStream(destinationPath);

        stream.pipeline(source, gzip, destination, (err) => {
            if (err) {
                console.error('Zip operation failed', err);
                process.exitCode = 1;
            }
        });
    } catch (err) {
        console.error('An error occurred:', err);
    }

};

const decompress = async (files) => {
    const [sourceFile, destinationDir] = files.split(' ');

    try {
        const fileName = basename(sourceFile);
        const destinationPath = join(destinationDir, fileName);

        const source = fs.createReadStream(fileName);
        const destination = fs.createWriteStream(destinationPath);

        source.pipe(createGunzip()).pipe(destination);
    }
    catch (err) {
        console.error('An error occurred:', err);
    }
};

export {
    compress, decompress
}