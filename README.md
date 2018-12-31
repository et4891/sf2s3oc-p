# sf2s3oc-p

## Install

```
$ npm install sf2s3oc-p -S
```

## Usage

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