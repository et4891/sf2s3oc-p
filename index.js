global.__r = `${__dirname}`;  // set global __r variable as __dirname which is used in const/global.js
require('./utils/consts/global'); // set global variables which is used for require, e.g. require(`${__r}`/models)

module.exports = require('./watcher/index');
