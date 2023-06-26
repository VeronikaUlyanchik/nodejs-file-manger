import os from "os";
import {chdir, cwd} from "node:process";
import path from "path";
import fs from "fs/promises";

const getHomeDir = () => os.homedir();

const getCurrentDir = () => cwd();

const setCurrentDir = (currentDir) => {
    chdir(currentDir);

    return getCurrentDir();
};

const upToDir = () => {
    if(cwd() === os.homedir()) {
        return;
    }
    chdir('..');
}

const redirectToDir = (dir) => {
    if(!dir) {
        throw new Error('Invalid command arguments!')
    }

    const currentDir = getCurrentDir();

    if(!path.isAbsolute(dir)){
        chdir(path.join(currentDir,dir))
    } else {
        chdir(path.join(dir))
    }
}

const readDir = async () => {
    const currentDir = getCurrentDir();
    let files = await fs.readdir(currentDir);

    const filesTable = await Promise.all(
        files.map(async (file) => {
            const filepath = path.join(currentDir, file);
            const stat = await fs.lstat(filepath);
            const type = stat.isFile() ? 'file' : 'directory';

            return { Name: file, Type: type };
        })
    );
    console.table(filesTable);
}

export {
    readDir,
    redirectToDir,
    upToDir,
    setCurrentDir,
    getHomeDir,
    getCurrentDir,
}