### path 模块

* `path.basename(path[, ext])`: 返回文件名。

```js
path.basename('/foo/bar/baz/asdf/quux.html')
// Returns: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html')
// Returns: 'quux'
```

* `path.dirname(path)`: 返回路径地址。

```js
path.dirname('/foo/bar/baz/asdf/quux')
// Returns: '/foo/bar/baz/asdf'
```

* `path.exename(path)`: 如果最后一个 `.` 之前若有字符, 则返回 `.` 和后面的字符, 否则返回 ''。

```js
path.extname('index.html')
// Returns: '.html'

path.extname('index.coffee.md')
// Returns: '.md'

path.extname('index.')
// Returns: '.'

path.extname('index')
// Returns: ''

path.extname('.index')
// Returns: ''

path.extname('.index.md')
// Returns: '.md'
```

* `path.join()`: 将传入的参数进行合并。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// Returns: '/foo/bar/baz/asdf'
```

* `path.resolve()`: 返回绝对路径(绝对路径以 `/` 开头), 注意该 api 遵循`从右向左最小匹配`原则。

```js
path.resolve('/foo', '/bar', 'baz')
// 根据从右向左匹配原则, /bar 与 baz 组成了绝对路径, 所以返回的结果是 /bar/baz

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

* `path.relative(from, to)`: 返回相对路径, 其为 `to 路径`相对 `from 路径`的差值。

```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// Returns: '../../impl/bbb'
```
