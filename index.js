global.__r = `${__dirname}`;  // set global __r variable as __dirname which is used in const/global.js
require('./utils/consts/global'); // set global variables which is used for require, e.g. require(`${__r}`/models)

module.exports = type => {
    switch (type) {
        case 'function':
            return require('./watcher/index');
            break;
        case 'class':
            return require('./watcher/class/');
            break;
        default:
            return require('./watcher/index');
            break;
    }
};
