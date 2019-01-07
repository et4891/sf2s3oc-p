const { startWatch } = require('../class/start');

class Watch {
    constructor(
        _watchPath = false,
        _awsConfig = {},
        _s3Config = {},
        _options = {
            logPath: {}
        }
    ) {
        this.log = console.log.bind(console);
        this.watchPath = _watchPath;
        this.awsConfig = _awsConfig;
        this.s3Config = _s3Config;
        this.options = _options;
        this.start = () => startWatch(this._watchPath, this._awsConfig, this._s3Config, this._options);
    }

    set watchPath( watchpath ) {
        this._watchPath = watchpath;
    }

    set awsConfig( {
                       accessKeyId = null,
                       secretAccessKey = null
                   } ) {
        this._awsConfig = { accessKeyId, secretAccessKey }
    }

    set s3Config( { bucket = null } ) {
        this._s3Config = { bucket };
    }

    set options( {
                     logPath = {},
                     ignore = {}
                 } ) {
        this._options = {
            logPath,
            ignore
        }
    }

}

module.exports = Watch;