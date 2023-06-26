const path = require('path');
const os = require("os");
const fs = require('fs')
const { chdir, cwd } = require('node:process');

const fsCommandsHandler = {
  up: ()=> upToDir(),
  cd: (path)=> redirectToDir(path),
  ls: ()=> readDir(),
  cat: ()=> console.log('cat'),
  add: ()=> console.log('add'),
  cp: ()=> console.log('cp'),
  mv: ()=> console.log('mv'),
  rm: ()=> console.log('rm'),
}

const upToDir = () => {
  if(cwd() === os.homedir()) {
    return;
  }
  chdir('..');
}

const redirectToDir = (dir) => {
  chdir(dir)
}

const readDir = () => {
  console.log(fs.readdirSync(cwd(), {withFileTypes: true}))
}

module.exports = { fsCommandsHandler, fsCommands:Object.keys(fsCommandsHandler) };
