import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { parseName } from "./cli/argv.js";
import { fileURLToPath } from "url";
import { commands, commandsHandler, setCurrentDir, getHomeDir, getCurrentDir } from "./commands/service.js"


const rl = readline.createInterface({ input, output });

const NAME = parseName();
const currentDir = setCurrentDir(getHomeDir());

console.log(`Welcome to the File Manager, ${NAME}`);
console.log(`You are currently in: ${currentDir}`);

rl.on('close', ()=> {
    console.log(`Thank you for using File Manager, ${NAME} , goodbye!`)
})

rl.on('line', async (input) => {
    const splitParts = input.split(' ');
    const command = splitParts[0];
    const args = splitParts.slice(1).join(" ");

    if (command === '.exit') {
        rl.close();
        return;
    }

    if (commands.includes(command)) {
        await commandsHandler[command](args)
    } else {
        console.log('Invalid command!')
    }
    console.log(`You are currently in: ${getCurrentDir()}`);
});