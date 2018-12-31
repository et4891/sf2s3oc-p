exports.getS3Obj = (s3, Key, Bucket) => {
    const s3GetParams = {
        Bucket,
        Key,
    };

    return new Promise((res, rej) => {
        s3.getObject(s3GetParams, (err, data) => {
            // if (err) rej(err);
            if (err) console.log(`${err.message} --> ${Key}`);
            (!!data) ? res(data) : res(null);  // return (null / false) or data which contacts the object's attributes
        });
    });
};

// compare object modified time in ms and size
exports.compareFile = (s3Obj, getFileStat) => {
    // if modified ms is NOT the same
    // AND
    // if file size is NOT the same
    return (
        String(getFileStat.mtimeMs) !== s3Obj.Metadata.mtimems &&
        String(getFileStat.size) !== s3Obj.Metadata.size
    )
};
