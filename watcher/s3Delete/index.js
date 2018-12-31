exports.s3Delete = async (filePath, watchPath, s3, s3Config = {}) => {
    try {
        const Key = filePath.replace(watchPath, '');

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
        console.log(`File ${filePath} has been removed`)
    } catch (e) {
        console.log(e, 's3Delete');
    }
};
