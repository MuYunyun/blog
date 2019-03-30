### 操作远程文件

```
git push origin :[branch] 删除远程分支
git rm -r --cached [file] 删除远程文件
```

### git commit 提交规范

```
feat: 新功能
fix: 修复 bug
test: 增加/修改测试用例
chore: 修改工具相关
docs: 修改文档
perf: 提升性能
reflactor: 重构, 不影响当前逻辑
style: 修改样式
deps: 升级依赖
```

### PR 相关

```
git remote -v               列出远程仓库 url
git remote add [name] [url] 添加远程仓库 url
git fetch [name]            拉取远程仓库最新代码
git merge [name]/master     合并远程分支最新代码到本地
```

### git pull 和 git fetch 的区别

`git pull` 等价于 `git fetch` 和 `git checkout -b`

### git merge 和 git rebase 的区别

* `git merge` 会多产生一次 merge 的 log 记录
* `git rebase` 会将主干新增的 log 前置到当前分支之前。

### git reset 和 git revert 的区别

* git revert 回退会产生一个新的 commit, 是向前的操作
* git reset 回退不会产生一个新的 commit, 是向后的操作

### git reset 撤销操作

以下都为 `commit` 了的情况, 下面对 `--mixed`、`--hard`、`--soft`

* git reset --soft Head~1: 撤销到上个分支, 撤销到 commit 之前, add 之后, 保留代码
* git reset --mixed Head~1: 撤销到上个分支, 撤销到 add 之前, 保留代码
* git reset --hard Head~1: 撤销到上个分支, 不保留代码

> 可以看到从上往下回复程度是在加强的。

### git cherry-pick

使用场景: 在一个分支中拉取另外一个分支`某一个 commit` 或`一段区间的 commit`

```js
git cherry-pick <commit id>
```

> [git cherry-pick 使用指南](https://www.jianshu.com/p/08c3f1804b36)

### git log

查看文件修改内容

```js
git lg -p
```