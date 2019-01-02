const { startWatch } = require('../class/start');

module.exports = function (
    watchPath = false,
    awsConfig = {},
    s3Config = {},
    options = {
        logPath: {}
    }
) {
    this.log = console.log.bind(console);
    this.watchPath = watchPath;
    this.awsConfig = awsConfig;
    this.s3Config = s3Config;
    this.options = options;

    this.start = () => startWatch(this.watchPath, this.awsConfig, this.s3Config, this.options);
};
