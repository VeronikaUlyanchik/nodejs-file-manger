import { EOL, cpus, homedir, userInfo, arch } from 'os';

const osHandler = async (command) => {
    switch (command) {
        case '--EOL': {
            console.log(EOL)
            break;
        }
        case '--cpus': {
            const cpusInfo = cpus();

            console.log(`Number ${cpusInfo.length}`);
            console.table(cpusInfo.map((cpu) => ({"Model and clock rate (in GHz)": cpu.model})));
            break;
        }
        case '--homedir': {
            console.log(`homedir: ${homedir()}`);
            break;
        }
        case '--username': {
            console.log(`username: ${userInfo().username}`);
            break;
        }
        case '--architecture': {
            console.log(arch());
            break;
        }

        default:
            console.log('Invalid command arguments!')
    }
};

export {osHandler}
