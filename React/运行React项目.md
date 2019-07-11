### React 16 之后的打包方式

* 16 之前是每个文件单独打包在 lib 文件夹下, [15.6.2](https://unpkg.com/react@15.6.2/lib/)
* 16 版本只暴露两个包在 umd 文件夹下, [16.0.0](https://unpkg.com/react@16.0.0/umd/)

> 打包方式有这个转变的原因是因为之前打成多个包的形式对于打包器来说是低效的(会多出大量胶水代码)。

### 迁移到 rollup

### 相关链接

* [Repository Infrastructure](https://react.docschina.org/blog/2017/12/15/improving-the-repository-infrastructure.html)
