const { dateNow, writeLog } = require(`${__func}/common`);
const { IGNORE_FILES_TO_S3, IGNORE_FOLDERS } = require(`${__consts}/regex`);
const logPath = require(`${__consts}/log`);

exports.s3Delete = async (filePath, watchPath, s3, s3Config = {}, options) => {
    try {
        const Key = filePath.replace(watchPath, '');
        const filename = Key.split('/').pop();
        // console.log(new RegExp(IGNORE_FILES_TO_S3()).test(filename), 'new RegExp(IGNORE_FILES_TO_S3()).test(filename)');
        // if (new RegExp(IGNORE_FILES_TO_S3).test(filename)) return false;
        // check if folder need to be ignored
        // if (new RegExp(IGNORE_FOLDERS).test(Key)) return false;

        const s3Params = {
            Bucket: s3Config.bucket,
            Key
        };

        const s3do = await s3.deleteObject(s3Params).promise();
        console.log(s3do, 's3dos3dos3dos3do');

        // s3.deleteObject(s3Params, function (err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else console.log(data);           // successful response
        //     /*
        //     data = {
        //     }
        //     */
        // });
        await writeLog(
            options.logPath.remove || logPath.remove,
            `${JSON.stringify(s3do)}\n${dateNow()} - File ${filePath} has been removed\n`
        );
        console.log(`${JSON.stringify(s3do)}\n${dateNow()} - File ${filePath} has been removed`);
        // console.log(`File ${filePath} has been removed`)
    } catch (e) {
        console.log(e, 's3Delete');
    }
};
