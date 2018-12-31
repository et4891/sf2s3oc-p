exports.s3DeleteDir = async (filePath, watchPath, s3, s3Config) => {
    try {
        const Prefix = filePath.replace(watchPath, '');  // prefix is the folder will be removed
        // console.log(Prefix, 'Prefixxxxxxxxxxxxxx');
        const Bucket = s3Config.bucket;

        const listParams = {
            Bucket,
            Prefix
        };

        const listedObjects = await s3.listObjectsV2(listParams).promise();  // list the objects in the folder
        // console.log(listedObjects, 'listedObjectslistedObjectslistedObjects');

        if (listedObjects.Contents.length === 0) return;

        const deleteParams = {
            Bucket,
            Delete: { Objects: [] }
        };

        // console.log(deleteParams, 'deleteParamsdeleteParams');
        listedObjects.Contents.forEach(({ Key }) => {
            // remove the objects using the Key
            deleteParams.Delete.Objects.push({ Key });
        });

        console.log(`Directory ${filePath} has been removed`);
    } catch (e) {
        console.log(e.code, 's3DeleteDir');
    }
};
