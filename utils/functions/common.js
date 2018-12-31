const fs = require('fs');

exports.getFileStat = (path) => {
    return new Promise((res, rej) => {
        fs.stat(path, (err, stat) => {
            if (err) rej(err);
            res(stat);
        });
    });
};