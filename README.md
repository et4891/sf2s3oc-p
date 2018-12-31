# sf2s3oc-p

## Install

```
$ npm install sf2s3oc-p -S
```

## Usage
create a file with the script below e.g. `watch.js`
```js
const sf2s3oc = require('sf2s3oc-p');

sf2s3oc.start(
    'folder path',
    {
        accessKeyId: 'aws accessKeyId',
        secretAccessKey: 'aws secretAccessKey'
    },
    { bucket: 's3 bucket' }
);
```

### Run
run using `node/nodemon/pm2 path` e.g `node index` or `pm2 index`
