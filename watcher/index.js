const chokidar = require('chokidar');
const AWS = require('aws-sdk');


const { s3Put } = require('./s3Put');
// const { s3PutDir } = require('./s3PutDir');
const { s3Delete } = require('./s3Delete');
const { s3DeleteDir } = require('./s3DeleteDir');

module.exports = {
    log: console.log.bind(console),
    start: function (
        watchPath = false,
        awsConfig = {},
        s3Config = {},
        options = {
            logPath: {},
            ignore: {}
        }
    ) {
        if (!watchPath) return this.log('Please enter a path to watch');
        AWS.config.update({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey
        });
        const s3 = new AWS.S3();
        const watcher = chokidar.watch(watchPath, {
            // ignored: /(^|[\/\\])\../,
            persistent: true
        });

        // Add event listeners.
        watcher
            .on('add', filePath => s3Put(filePath, watchPath, s3, s3Config, options))
            .on('unlink', filePath => s3Delete(filePath, watchPath, s3, s3Config, options))
            .on('addDir', path => (`Directory ${path} has been added`))
            .on('unlinkDir', filePath => s3DeleteDir(filePath, watchPath, s3, s3Config, options))
            .on('error', error => this.log(`Watcher error: ${error}`))
            .on('ready', () => this.log('Initial scan complete. Ready for changes'));
        // .on('raw', (event, path, details) => {
        //     this.log('Raw event info:', event, path, details);
        // });

        watcher.on('change', (filePath, stats) => {
            if (stats) this.log(`-----------File ${filePath} changed size to ${stats.size}-----------`);
            s3Put(filePath, watchPath, s3, s3Config, options);
        });
    }
};