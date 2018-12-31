const fs = require('fs');
// const { AWS_KEYS } = require(`${__s3Consts}`);
const { IGNORE_FILES_TO_S3, IGNORE_FOLDERS } = require(`${__consts}/regex`);
const { getFileStat } = require(`${__func}/common`);
const { compareObjectMT } = require(`${__func}/s3`);

exports.s3Put = async (filePath, watchPath, s3, s3Config = {}) => {
    try {
        fs.readFile(filePath, async (err, fileBinary) => {
            if (err) throw err;

            const Key = filePath.replace(watchPath, '');
            const filename = Key.split('/').pop();

            // if filename is within the regex, ignore the file.  Do nothing.
            if (new RegExp(IGNORE_FILES_TO_S3()).test(filename)) return false;
            // check if folder need to be ignored
            if (IGNORE_FOLDERS(Key)) return false;

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

            compareObjectMT(
                s3,
                Key,
                getStat,
                s3Config.bucket
            ).then(async data => {
                // if key/file exists modify it
                // compare some metadata first to see if modify or not
                if (!data) {
                    const s3po = await s3.putObject(s3PutParams).promise();
                    console.log(s3po, 'successful response');
                    console.log(`File ${filePath} has been modified`);
                }
            }).catch(async err => {
                // if key/file does not exist, add it
                const s3po = await s3.putObject(s3PutParams).promise();
                console.log(err.message, `error: (add key because not exist) -> ${Key}`);
                // console.log(s3po, 'successful response');
                console.log(`File ${filePath} has been added`);
            });
        });
    } catch (e) {
        console.log(e, 's3Add');
    }
};
