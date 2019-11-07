### 操作远程文件

```bash
git push origin :[branch] 删除远程分支
git rm -r --cached [file] 删除远程文件
```

### git commit 提交规范

```bash
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

```bash
git remote -v               列出远程仓库 url
git remote add [name] [url] 添加远程仓库 url
git fetch [name]            拉取远程仓库最新代码
git merge [name]/master     合并远程分支最新代码到本地
```

### git pull 和 git fetch 的区别

`git pull` 等价于 `git fetch` 和 `git checkout -b`

### git merge 和 git rebase 的区别

* `git merge` 会多产生一次 merge 的 log 记录;
* `git rebase` 会将主干新增的日志记录前置到当前分支之前;

> git merge --no-ff 在每次合并都会产生一个新的合并记录; git merge 的话只有解决冲突的时候才会产生一个新的合并记录。

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

```bash
git cherry-pick <commit id>
git cherry-pick 371c2…971209 // (2,5]
git cherry-pick 371c2^…971209 // [2,5]
```

### git log

查看文件修改内容

```js
git lg -p
```

### 对线上代码 (master 分支) 进行修复

1. 在 `master` 分支上使用 `git reset --hard xxxxxx`;
2. 使用 `git checkout -b` 创建 `fix/xxx` 分支, 在该分支上进行 bug 修复;
3. 回到 `master` 分支, 可以使用 `git reflog` 查看之前 reset 过来的分支节点, 再执行 `git reset --hard xxxxxx` 回到那个节点。
4. 在 master 的最新节点上使用 `git merge --no-ff fix/xxx`

### github 使用技巧

选择一句话, 按 r 对该话进行引用回复。

### 关于 pull request

如果是比较复杂的 Feature 可以越早的(在开发过程)提 pr, 这样子可以提早的指出问题代码。

当有人提了 `pr`, 需要观察 pr 的代码是否存在问题。比如使用如下命令:

```bash
git remote add lanyincao git@github.com:snakeUni/snake-design.git
```

### git reflog

git reflog 可以查看所有分支的所有操作记录

### 一个痛点

输入 `git branch` 分支情况如下:

![](http://with.muyunyun.cn/c5586a56a252a983713f306ea2902255.jpg)

输入 `git branch --merged` 后查看已合并的分支

![](http://with.muyunyun.cn/38861f42cde27e6d1ae0ecc73a7f2357.jpg)

如何一键快速删除这些已合并的分支并删除远端的分支呢

参考此脚本, 后续跟进。

### 打 tag

```bash
git tag v0.1
git tag -d v0.1         // 删标签
git push orgin v0.1 // 推标签
```

### git 项目大小写

git 默认初始化的项目是不区分文件名大小写的, 可以执行下这行命令

```js
git config core.ignorecase false
```