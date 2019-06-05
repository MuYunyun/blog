### 基于 create-react-app 的改动

基于 `create-react-app` fork 的脚手架有以下两点好处:

* `facebook` 团队帮忙更新迭代新技术
* 自定义模板/脚本抽离出来后从而在其它项目能进行复用

> `fork` 的项目需要定期和 `create-react-app` 保持同步, 上次同步时间: `2019-02-16`

### 使用自定义模板/脚本创建项目

只需要维护 `packages/scripts` 的文件就行。

* 更改 `packages/scripts` 目录下的 `package.json` 的各种配置信息, 比如将 `react-script` 里的 `name` 更名为 `react-siren-scripts`;
* `react-scripts/scripts/init.js` 添加 `console.log()`;
* `react-scripts/template`: 修改模板文件;

```
npx create-react-app my-app w--scripts-version react-siren-scripts
```

目前其集成了 `scss`

### 参考文章

* [Customizing create-react-app: How to Make Your Own Template](https://auth0.com/blog/how-to-configure-create-react-app/)