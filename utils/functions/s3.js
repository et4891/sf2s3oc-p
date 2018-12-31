// compare object modified time in ms
exports.compareObjectMT = (s3, Key, getFileStat, Bucket) => {
    const s3GetParams = {
        Bucket,
        Key,
    };
    return new Promise(async (res, rej) => {
        try {
            const s3go = await s3.getObject(s3GetParams).promise();
            // console.log(s3go, 's3goooo');

            if ('ETag' in s3go) {
                // if modified date are not the same on bucket and local
                // AND
                // if file size are the same on bucket and and local
                // meaning do not change
                // modified date might be changed accidentally by saving the file
                res((String(getFileStat.mtimeMs) !== s3go.Metadata.mtimems &&
                    String(getFileStat.size) === s3go.Metadata.size))
            } else {
                res ('NO CHANGES');
            }


            // s3.getObject(s3GetParams, (err, data) => {
            //     if (err) rej(err);
            //
            //     // what to return as resolve if there is data or not
            //     if (data) {
            //         // if modified date are not the same on bucket and local
            //         // AND
            //         // if file size are the same on bucket and and local
            //         // meaning do not change
            //         // modified date might be changed accidentally by saving the file
            //         res((String(getFileStat.mtimeMs) !== data.Metadata.mtimems &&
            //             String(getFileStat.size) === data.Metadata.size))
            //     } else {
            //         res('NO CHANGES');
            //     }
            // });
        } catch (e) {
            console.log(e.message, 's3 function compareObjectMT');
        }
    });
};
