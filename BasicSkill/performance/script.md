### script

```js
<html>
  <body>
    ...
    <script src='a.js'></script>
    <script src='b.js'></script>
  </body>
</html>
```

这段代码的含义是：在文档资源执行完毕后，然后 `a.js`、`b.js` 并发下载(浏览器机制)，顺序执行。

上面这种写法与下面这种写法效果上相同：

```js
<html>
  <head>
    <script src='a.js' defer></script>
    <script src='b.js' defer></script>
  </head>
  <body>
    ...
  </body>
</html>
```

注意到关键词 `defer`，它的作用是将 `a.js` 和 `b.js` 的执行时机推延到文档资源执行完毕后，也是并发下载，顺序执行。

再来看如下写法：

```js
<html>
  <head>
    <script src='a.js' async></script>
    <script src='b.js' async></script>
  </head>
  <body>
    ...
  </body>
</html>
```

此时的关键词是 `async`，它的作用也是将 `a.js` 和 `b.js` 的执行时机推延到文档资源执行完毕后，也是并发下载，但是执行顺序是 `谁先下载好先执行谁`