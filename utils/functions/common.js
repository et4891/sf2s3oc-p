const fs = require('fs');
const path = require('path');

exports.getFileStat = (path) => {
    return new Promise((res, rej) => {
        fs.stat(path, (err, stat) => {
            if (err) rej(err);
            res(stat);
        });
    });
};

const mkDirByPathSync = (targetDir, { isRelativeToScript = false } = {}) => {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
};

exports.writeLog = (fullPath, content) => {

    const pathSplit = fullPath.split('/');
    const filename = pathSplit.pop();
    const directory = pathSplit.join('/');
    mkDirByPathSync(directory);
    fs.writeFile(`${directory}/${filename}`, content, (err) => {
        if (err) return console.log(err);

        console.log('The log was saved!');
    });
};

exports.dateNow = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const ms = today.getMilliseconds();
    let mm = today.getMonth() + 1; //January is 0!
    let dd = today.getDate();
    let ss = today.getSeconds();

    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }

    if (ss < 10) {
        ss = `0${ss}`;
    }

    return `${yyyy}/${mm}/${dd}-${ss}:${ms}`;
};