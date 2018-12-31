exports.s3PutDir = (filePath, watchPath, s3, s3Config) => {
    try {
        const Key = `${filePath.replace(watchPath, '')}/`;
        console.log(Key, 'keyyyyyyyyyyyy');

        const s3Params = {
            Body: null,
            Bucket: s3Config.bucket,
            Key,
        };
        s3.putObject(s3Params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
            /*
            data = {
             ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
             VersionId: "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
            }
            */
        });

        console.log(`Directory ${filePath} has been added`);
    } catch (e) {
        console.log(e, 's3PutDir');
    }
};
