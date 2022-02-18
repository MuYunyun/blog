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

files to exclude: 用多个 `,` 作为分隔符隔开，每个 `,` 间可以使用正则。

### VScode 中使用 markdown 不能显示预览图片

按 cmd + shift + p，输入 markdown，搜索 markdown 更改预览安全设置，选择 Allow Insecure Contents 即可。
