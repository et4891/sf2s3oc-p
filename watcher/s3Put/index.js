const fs = require('fs');
const { regexIgnore, REGEXS } = require(`${__consts}/regex`);
const logPath = require(`${__consts}/log`);
const { getFileStat, dateNow, writeLog, clog } = require(`${__func}/common`);
const { getS3Obj, compareFile } = require(`${__func}/s3`);


exports.s3Put = async (filePath, watchPath, s3, s3Config = {}, options) => {
    try {
        fs.readFile(filePath, async (err, fileBinary) => {
            if (err) throw err;

            const Key = filePath.replace(watchPath, '');
            const filename = Key.split('/').pop();

            // if filename is within the regex, ignore the file.  Do nothing.
            if (new RegExp(regexIgnore(options.ignore.files || REGEXS.files))
                    .test(filename)) return false;
            // check if folder need to be ignored
            if (new RegExp(regexIgnore(options.ignore.folders || REGEXS.folders))
                    .test(Key)) return false;

            const getStat = await getFileStat(filePath);
            // console.log(getStat, 'getstatsssssssssssssss');
            const s3PutParams = {
                Body: fileBinary,
                Bucket: s3Config.bucket,
                Key,
                Metadata: {
                    mtimeMs: String(getStat.mtimeMs),
                    size: String(getStat.size)
                }
            };

            // check if file object exists on bucket
            const s3ObjExist = await getS3Obj(s3, Key, s3Config.bucket);

            // console.log(options, 'optionsss');

            // if object does not exist, then create the file
            if (!s3ObjExist) {
                const s3po = await s3.putObject(s3PutParams).promise();
                await writeLog(
                    options.logPath.add || logPath.add,
                    `${JSON.stringify(s3po)}\n${dateNow()} - File ${filePath} has been added\n`
                );
                console.log(`${JSON.stringify(s3po)}\n${dateNow()} - File ${filePath} has been added`);
                return;
            }
            // console.log(s3ObjExist, 's3ObjExists3ObjExists3ObjExist');

            // if object exist then compare local and s3 file to see if need to modify the file
            const cf = compareFile(s3ObjExist, getStat);
            // console.log(cf, 'cffffffffffffffffff');
            if (cf) {
                const s3po = await s3.putObject(s3PutParams).promise();
                await writeLog(
                    options.logPath.modified || logPath.modified,
                    `${JSON.stringify(s3po)}\n${dateNow()} - File ${filePath} has been modified\n`
                );
                console.log(`${JSON.stringify(s3po)}\n${dateNow()} - File ${filePath} has been modified`);
            }
        });
    } catch (e) {
        console.log(e, 's3Add');
    }
};
