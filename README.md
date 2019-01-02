## Install

```
$ npm install sf2s3oc-p -S
```

## To Start
first create a file with the script below e.g. `watch.js`

## Usage (Function)
```js
const sf2s3oc = require('sf2s3oc-p')();

sf2s3oc.start(
    'folder/path/',  // with ending slash else aws will create a nested folder named ___
    {
        accessKeyId: 'aws accessKeyId',
        secretAccessKey: 'aws secretAccessKey'
    },
    { bucket: 's3 bucket' }
);

// Change Default Log Path Example
// pass 4th param
sf2s3oc.start(
    'folder/path/',  // with ending slash else aws will create a nested folder named ___
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
````

## Usage (Class)
```js
const sf2s3oc = require('sf2s3oc-p')('class');
const nw = new sf2s3oc(
    'folder/path/',  // with ending slash else aws will create a nested folder named ___
    {
        accessKeyId: 'aws accessKeyId',
        secretAccessKey: 'aws secretAccessKey'
    },
    { bucket: 's3 bucket' }
);
nw.start();

// example with setters

const anw = new s();

anw.watchPath = 'folder/path/';  // with ending slash else aws will create a nested folder named ___
anw.awsConfig = {
    accessKeyId: 'aws accessKeyId',
    secretAccessKey: 'aws secretAccessKey'
};
anw.s3Config = { bucket: 's3 bucket' };
anw.options = {
    logPath: {
        add: './log/add.txt',  // this is the default
        modified: './logs/modified.txt',  // this is the default
        remove: './log/remove.txt',  // this is the default
    }
};
anw.start();
```
### Run
run using `node/nodemon/pm2 path` e.g `node index` or `pm2 index`
