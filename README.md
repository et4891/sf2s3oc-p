## Install

```
$ npm install sf2s3oc-p -S
```

## Usage
create a file with the script below e.g. `watch.js`
```js
const sf2s3oc = require('sf2s3oc-p');

// uses function
sf2s3oc.default.start(
    'folder path',
    {
        accessKeyId: 'aws accessKeyId',
        secretAccessKey: 'aws secretAccessKey'
    },
    { bucket: 's3 bucket' }
);

// uses class
const nw = new sf2s3oc.class(
    'folder path',
    {
        accessKeyId: 'aws accessKeyId',
        secretAccessKey: 'aws secretAccessKey'
    },
    { bucket: 's3 bucket' }
);

nw.start();
```
### Run
run using `node/nodemon/pm2 path` e.g `node index` or `pm2 index`

### Change Default Log Path Example
pass 4th param

```javascript
sf2s3oc.default.start(
    'folder path',
    {
        accessKeyId: 'aws accessKeyId',
        secretAccessKey: 'aws secretAccessKey'
    },
    { bucket: 's3 bucket' },
    {
        logPath: {
            add: 'path to log',
            modified: 'path to log',
            remove: 'path to log',
        }
    }
);
```