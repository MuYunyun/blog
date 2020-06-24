### fs.Stats

```
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT
}
```

Today, I'll diff atime、mtime、ctime and birthtime in Node.js.

* `atime`: or access time, is updated when the file’s contents are read by an application or a command such as `grep` or `cat`.
* `mtime`: or modification time, is when the file was last modified. When you change the contents of a file, its mtime changes.
* `ctime`, or change time, is when the file’s property changes. It will always be changed when the mtime changes, but also when you change the file’s permissions, name or location.