import fs from 'fs/promises'
import {createReadStream, createWriteStream, unlink} from 'fs';
import { join, basename } from 'path';
import { getCurrentDir } from "../service.js";

const read = async (file) => {
    const dir = getCurrentDir();

    try {
        const buffer = await fs.readFile(join(dir, file));
        console.log(buffer.toString());
    }
    catch {
        console.error('Operation failed')
    }
};

const rename = async (files) => {
    const [oldFileName, newFileName] = files.split(' ');
    const dir = getCurrentDir();

    const oldFilePath = join(dir, oldFileName);
    const newFilePath = join(dir, newFileName);
    try {
        await fs.rename(oldFilePath, newFilePath)
    } catch {
        console.error('Operation failed')
    }
};

const create = async (file) => {
    const dir = getCurrentDir();
    const freshFile = join(dir, file);

    try {
        await fs.writeFile(freshFile, '')
    } catch {
        console.error('Operation failed')
    }
};

const remove = async (file) => {
    const dir = getCurrentDir();
    const deleteFile = join(dir, file);

    try {
        await fs.unlink(deleteFile)
    } catch {
        console.error('Operation failed')
    }
};

const copy = async (files) => {
    const [sourceFile, destinationDir] = files.split(' ');

    const fileName = basename(sourceFile);
    const destination = join(destinationDir, fileName);

    const readStream = createReadStream(fileName, 'utf8');
    const writeStream = createWriteStream(destination);

    readStream.pipe(writeStream);

    readStream.on('error', () => {
        console.error('Operation failed')
    });

    writeStream.on('error', () => {
        console.error('Operation failed')
    });

    writeStream.end();
}

const move = async (files) => {
    const [sourceFile, destinationDir] = files.split(' ');

    const fileName = basename(sourceFile);
    const destination = join(destinationDir, fileName);

    const readStream = createReadStream(fileName, 'utf8');
    const writeStream = createWriteStream(destination);

    readStream.pipe(writeStream);

    readStream.on('error', () => {
        console.error('Operation failed')
    });

    writeStream.on('error', () => {
        console.error('Operation failed')
    });

    writeStream.on('finish', () => {
        unlink(fileName, (error) => {
            if (error) {
                console.error('Operation failed')
            }
        });
    });

    writeStream.end();
}

export {
    remove,
    read,
    create,
    rename,
    copy,
    move,
}