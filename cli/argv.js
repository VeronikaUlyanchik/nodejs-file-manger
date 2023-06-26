export const parseName = () => {
    const res = [];
    process.argv.forEach((arg, index) => {
        if(arg.startsWith('--username')){
            const name = arg.split('=');
            res.push(name[1])
        }
    });
    return res.join();
};