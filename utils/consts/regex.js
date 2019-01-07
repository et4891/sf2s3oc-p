// using string as value because we might do multiple regex check such as using IGNORE_FILES_TO_S3
// can be using array instead of object which is less coding but rather use object because the value can be a description
const REGEXS = {
    files: {
        GOUTPUTSTREAM: '^.goutputstream.*', // any files starts with .goutputstream this is because when file is edited, this file will be created automatically and removed
        HELLO: '^.hello.*', // testing purpose to combine regex
    },
    folders: {
        GNUPG: '^.gnupg*', //
        HELLO: '^.hello.*'
    }
};

/* rf means regex files / folders  */
const regexIgnore = (rf) => {
    let regexArr = [];
    for (const key of Object.keys(rf)) {
        regexArr.push(rf[key]);
    }
    return regexArr.join('|');
};

exports.IGNORE_FILES_TO_S3 = regexIgnore(REGEXS.files);

exports.IGNORE_FOLDERS = regexIgnore(REGEXS.folders);
