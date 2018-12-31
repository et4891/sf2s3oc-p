const fs = require('fs');
const chokidar = require('chokidar');
const AWS = require('aws-sdk');


const { s3Put } = require('./s3Put');
// // const { s3PutDir } = require('./s3PutDir');
// const { s3Delete } = require('./s3Delete');
// const { s3DeleteDir } = require('./s3DeleteDir');

module.exports = {
    log: console.log.bind(console),
    start: function (
        watchPath = false,
        awsConfig = {},
        s3Config = {},
        options = {}
    ) {
        if (!watchPath) return this.log('Please enter a path to watch');
        AWS.config.update({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey
        });

        const watcher = chokidar.watch(watchPath, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });

        // Add event listeners.
        watcher
            .on('add', filePath => s3Put(filePath, watchPath, AWS, s3Config))
            // .on('unlink', path => s3Delete(path))
            // .on('addDir', path => (`Directory ${path} has been added`))
            // .on('unlinkDir', path => s3DeleteDir(path))
            // .on('error', error => this.log(`Watcher error: ${error}`))
            .on('ready', () => this.log('Initial scan complete. Ready for changes'));
        // .on('raw', (event, path, details) => {
        //     this.log('Raw event info:', event, path, details);
        // });

        watcher.on('change', (filePath, stats) => {
            s3Put(filePath, watchPath, AWS, s3Config);
            if (stats) this.log(`File ${filePath} changed size to ${stats.size}`);
        });
    }
};


//
// const watcher = chokidar.watch('/home/et/code/github/abc/', {
//     ignored: /(^|[\/\\])\../,
//     persistent: true
// });
//
// // Something to use when events are received.
// const log = console.log.bind(console);
// // Add event listeners.
// watcher
//     .on('add', path => log(`File ${path} has been added`))
//     .on('change', path => log(`File ${path} has been changed`))
//     .on('unlink', path => log(`File ${path} has been removed`));
//
// // More possible events.
// watcher
//     .on('addDir', path => log(`Directory ${path} has been added`))
//     .on('unlinkDir', path => log(`Directory ${path} has been removed`))
//     .on('error', error => log(`Watcher error: ${error}`))
//     .on('ready', () => log('Initial scan complete. Ready for changes'))
//     .on('raw', (event, path, details) => {
//         log('Raw event info:', event, path, details);
//     });
//
// // 'add', 'addDir' and 'change' events also receive stat() results as second
// // argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
// watcher.on('change', (path, stats) => {
//     if (stats) console.log(`File ${path} changed size to ${stats.size}`);
// });