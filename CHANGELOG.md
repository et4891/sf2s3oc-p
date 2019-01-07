# sf2s3oc-p

## ChangeLog
### Jan. 6, 2019
**v0.6.6**
- added ignore to options to ignore folders and files as wished

### Jan. 1, 2019
**v0.5.6**
- `require('package')()` require with param

**v0.4.6**
- es5 class -> es6 with setter

**v0.4.5**
- added `class` way to create watch instead of function
- added `logPath` to log changes

### Dec. 31, 2018
**v0.3.4**
- removed chokidar ignores all . files and folders

### Dec. 30, 2018
**v0.3.3**
- reorganized `s3Put()` logic

**v0.3.2**
- handled `try/catch` in `compareObjectMT()`

**v0.3.1**
- added `s3PutDir()` but not in use YET

**v0.3.0**
- able to delete dir from s3 when dir is removed, which will also remove all files within

**v0.2.0**
- able to delete from s3 when file is removed

**v0.1.0**
- able to upload to s3 when file is added / modified
