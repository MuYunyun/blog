<!--
abbrlink: a8r369v5
-->

### [css-loader](https://github.com/webpack-contrib/css-loader)

来看下面这一组 webpack 的配置项，

```js
{
  test: /\.less$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: true,  // 开启 css 模块化
        importLoaders: 2,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {...},
    },
    {
      loader: require.resolve('less-loader'),
      options: {...},
    },
  ],
},
```

它们执行顺序是 `less-loader`、`postcss-loader`、`css-loader`、`style-loader`。我们来理一下各 module 的作用：

* `less-loader`: 将 less 解析为 css
* `postcss-loader`: 将 css 兼容各浏览器加上相应前缀
* `css-loader`: 将 css 转化为 common.js 模块
* `style-loader`: 将 common.js 模块注入 `style` 标签中

> [Link issue](https://github.com/MuYunyun/reactSPA/issues/52)