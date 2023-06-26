import { createHash } from 'node:crypto';
import fs from "fs/promises";
import {getCurrentDir} from "../service.js";
import {join} from "path";

const calculateHash = async (file) => {
    const dir = getCurrentDir();
    const hashFilePath = join(dir, file);

    const buffer = await fs.readFile(hashFilePath)
    console.log(createHash('sha256').update(buffer).digest('hex'))
};

export { calculateHash };