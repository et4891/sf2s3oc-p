// using string as value because we might do multiple regex check such as using IGNORE_FILES_TO_S3
const REGEXS = {
    files: {
        GOUTPUTSTREAM: '^.goutputstream.*', // any files starts with .goutputstream this is because when file is edited, this file will be created automatically and removed
        HELLO: '^.hello.*', // testing purpose to combine regex
    },
    folders: {
        GNUPG: '.gnupg', // any files starts with .goutputstream this is because when file is edited, this file will be created automatically and removed
    }
};

exports.IGNORE_FILES_TO_S3 = () => {
    const rf = REGEXS.files;
    let regexArr = [];
    for (const key of Object.keys(rf)) {
        regexArr.push(rf[key]);
    }
    return regexArr.join('|');
};


exports.IGNORE_FOLDERS = (chars) => {
    const rf = REGEXS.folders;
    // if the folders match then ignore
    for (const key of Object.keys(rf)) {
        if (chars.includes(rf[key])) return true;
    }
    return false;
};