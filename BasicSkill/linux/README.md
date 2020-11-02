## 文件操作

### head

显示文件的头部内容，如果不指定参数默认显示 10 行

```bash
# 显示前 10 行内容
head README.md

# 或者显示多个文件
head README.md package.json

# -n 指定显示行数
head -n 100 README.md
```

### tail

显示文件的末尾部分

```bash
# 默认显示末尾10行
tail README.md

# -n 指定显示末尾20行
tail -n 20 README.md
```

### ls

```bash
# 显示当前目录列表
ls

# 显示目录列表的详细信息
ls -l

# 显示指定目录
ls ./src

# 可读性地显示目录列表详细信息, h means human-readable
ls -lh

# 列出所有文件包括隐藏文件
ls -a

# -F 可以显示类型，用以区分是文件还是目录
ls -F # 后缀为 ”/“ 代表是目录，”*“ 为可执行文件，没有则为文件

# -i 查看 inode 编号, 每一个文件或目录都有一个唯一的编号，这个数字由内核分配给文件系统中的每一个对象
ls -i

# 过滤文件列表, * 代表 0 个或多个字符, ? 代表一个字符
ls READ*
```

### pwd

显示当前路径

```bash
# pwd means pathname of the current working directory
pwd
```

### wc

统计文件的行数、字数、字节数, 常见用于`统计代码行数`

```bash
# 统计行数
wc -l README.md

# 统计字数
wc -w README.md

# 统计字符数, 中文占两个字符, 英文占一个字符
wc -m README.md
```

### find

指定某个目录下查找文件

```bash
# 在当前目录递归搜索文件名为 README.md 文件
find . -name README.md

# 通过通配符进行查找, 必须用引号括着, 这里查找所有后缀为 .md 文件
find . -name "*.md"
find . -iname "*.md"  # 忽略文件大小写

# 排除文件，只要加 ! , 排除掉所有 .md 后缀的文件
find . ! -name "*.md"

# 根据类型进行过滤搜索
# f 普通文件 d 目录
find . -type f

# 限定目录递归深度
find . -maxdepth 3  # 最大为3个目录
find . -mindepth 3  # 最小为3个目录

# 查找文件大小大于 25k 文件
find . -size +25k

# 查找 10 天前文件 -mtime 修改时间、 -ctime 创建时间、 -atime 访问时间
find . -mtime +10
```

### mkdir

```bash
# 在当前目录下创建 temp 目录
mkdir temp

# 创建多层目录, p means parent
mkdir -p temp/temp2/temp3

# 基于权限创建, m means mode
mkdir -m 777 temp
```

### more

* 空格 - 查看下一屏内容
* B - 查看上一屏内容
* 回车 - 查看下一行内容
* Q - 退出

```bash
more README.md

# 从第10行开始显示
more +10 README.md
```

### paste

合并 N 个文件的`列`。

> 并不是纵向合并, 而是横向合并。

```bash
# 1.txt 和 2.txt 合并输出
paste 1.txt 2.txt

# 1.txt 2.txt 合并后保存为 3.txt
paste 1.txt 2.txt > 3.txt
```

### stat

用于显示文件或目录的状态信息

```js
16777220 8702541224 -rw-r--r-- 1 mac staff 0 15857 "Nov  1 13:02:02 2020" "Nov  1 13:02:02 2020" "Nov  1 13:02:02 2020" "Oct 25 18:48:15 2020" 4096 32 0 README.md
```

### grep

强大的文本搜索工具, 被称为 Linux 命令三剑客。

```bash
# 从 README.md 文件中搜索 linux 关键字
grep "linux" README.md
grep "linux" README.md README2.md # 多个文件搜索

# 输出时高亮显示
grep "linux" README.md --color

# -o 只输出匹配部分
grep -o "linux" README.md --color

# -n 输出到匹配的行数
grep -n "linux" README.md

# -c 输出到匹配次数
grep -c "linux" README.md

# -r 递归目录文件搜索
grep -r "linux" ./src

# 使用 glob 风格表达式搜索
egrep "[0-9]" # 等价于 grep -E "[0-9]" README.md
```

### touch

创建一个空文件, 如果文件存在只会修改文件的创建时间

```bash
touch README.md
```

### cd

进入指定目录

```bash
# 进入当前 src 目录
cd src

# 回到上一次目录
cd -

# 返回上一级目录
cd ..
cd ../../..   # 返回多级

# 进入家目录
cd ~
cd # 或者不带任何参数

# 将上一个命令的参数作为cd参数使用
cd !$

# 模糊匹配目录，有时目录名很长一个一个敲效率就很低
# * 代表0个或多个字符， ? 代表一个字符
cd READ*
```

### rm

删除指定目录或文件

> 使用此命令需要非常小心, 一但删除无法恢复

```bash
# 删除当前 1.txt 文件
rm 1.txt

# -i 删除前询问是否真的要删除，因为一旦删除无法恢复
rm -i README.md

# 这条命令比较常用, 强制删除目录或文件
# -r 如果是目录递归删除, -f 强制删除 不发出任何警告
rm -rf ./src
```

### cp

拷贝文件或目录

```bash
# 将当前 README.md 文件拷贝到上一层
cp ./README.md ../README.md

# -a 将原文件属性一同拷贝, 修改时间、创建时间等
cp -a ./README.md ../README.md

# -r 用于递归拷贝目录
cp -r home ../home

# -i 如果目标文件存在会询问用户是否需要覆盖
cp -i README.md README.md
```

* [to read](https://github.com/xjh22222228/linux-manual#cat)

### link

* thanks for [Read Linux](https://github.com/xjh22222228/linux-manual).