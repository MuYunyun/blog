<!--
abbrlink: ues1uzcj
-->

### vscode 快捷键

* 全局替换: Command + Shift + H
* 当前页面全局替换: Command + option + F
* 格式化: shift + option + F
* 实时预览 md 文件: command + shift + V
* 格式化表格: alt + shift + F
* 向下复制当前行: shift + alt + ↓

### 左侧栏

* command + shift + E 打开资源
* command + shift + F 打开搜索
* ctrl + shift + G 打开 git
* command + shift + D 打开调试
* command + shift + X 打开扩展
* command + shift + r 打开 bookmarks
* command + shift + 0: toggle activitybar: [setting](https://stackoverflow.com/questions/30878856/is-there-a-shortcut-to-hide-the-side-bar-in-visual-studio-code)

### 推荐字体

* [vscode](https://github.com/sdras/night-owl-vscode-theme)

### 插件开发

* 本地开发调试
  * 打包：`vsce package`
  * 扩展视图命令下拉菜单中使用 `Install from VSIX` 命令安装

### 筛选技巧

1. files to include/files to exclude: 用多个 `,` 作为分隔符隔开，每个 `,` 间可以使用正则。
2. Search: 可以使用正则，在 Replace 中可以使用 `$1`、`$2` 表示括号内匹配到的内容。

```js
案例实践
目标：将组件 `<Comp />`，批量搜索添加上为参数 demo。
方法：在 Search 栏输入正则 `(<Comp [^/]+)`，替换栏输入 `$1demo ` 点击替换按钮即可完成批量替换。
```

### VScode 中使用 markdown 不能显示预览图片

按 cmd + shift + p，输入 markdown，搜索 markdown 更改预览安全设置，选择 Allow Insecure Contents 即可。

### 性能报告

>Developer:Startup Performance

可用于查看各插件占用时间。
