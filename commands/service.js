import {read, create, rename, remove, copy, move} from "./fs/operations.js";
import {calculateHash} from "./hash/calcHash.js";
import {readDir, redirectToDir, upToDir, setCurrentDir, getHomeDir, getCurrentDir} from "./fs/navigation.js";
import {osHandler} from "./os/os.js";
import {compress, decompress} from "./zip/zip.js";

const commandsHandler = {
  up: () => upToDir(),
  cd: (path) => redirectToDir(path),
  ls: async () => await readDir(),
  cat: async (file) => await read(file),
  add: async (file) => await create(file),
  cp: async (files)=> await copy(files),
  mv: async (files)=> await move(files),
  rn: async (files)=> rename(files),
  rm: async (file) => remove(file),
    hash: async (file) => calculateHash(file),
  os: (command) => osHandler(command),
  compress: (args) => compress(args),
  decompress: (args) => decompress(args),
}

const commands = Object.keys(commandsHandler);

export { commandsHandler, commands, setCurrentDir, getHomeDir, getCurrentDir };
