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

# 从第 10 行开始显示
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

### cat

查看指定整个文件内容

```bash
# 查看 README.md 文件所有内容
cat README.md
cat README.md README2.md  # 或者一次性显示多个文件

# -n 每一行显示行号
cat -n README.md

# -b 只给有内容的行显示行号
cat -b README.md
```

### mv

mv 有 2 个用途：

* 将文件或目录移动到另一个位置
* 将文件或目录重命名

```bash
# 将 README.md 重命名为 README-2.md, 如果 README-2.md 存在会直接覆盖。
mv README.md README-2.md

# 将 README.md 移动到上一层目录
mv README.md ../README.md

# -i 交互式操作，如果目标文件存在则进行询问是否覆盖
mv -i README.md ../README.md
```

### open

open 命令可在 linux / mac 具有可视化界面下进行文本编辑、打开应用程序等功能。

```bash
# 在mac下用Finder打开当前目录
open .

# 用默认应用程序打开文件
open README.md

# 用默认编辑器打开文件
open -e README.md

# 如果是一个URL用默认浏览器打开页面
open https://github.com/MuYunyun/blog.git

# 指定某个应用程序打开某个文件, 如果不指定文件默认直接打开程序
open -a /Applications/Google\ Chrome.app README.md
```

### source

在当前 Shell 环境中从指定文件读取和执行命令， 通常用于重新执行环境。

它有个别名 . 点操作符号。

```bash
# 等价 . ~/.bash_profile
source ~/.bash_profile
```

实际上大部分开发者都没搞懂 source 命令。 可以把它理解为编程语言中的 import, java/python/js 都有这个，就是用来导入文件。

下面演示 source 用于 shell 脚本中

util.sh

```bash
#!/bin/bash
getName() {
  echo "Linux"
}
```

main.sh

```bash
#!/bin/bash
# 加载文件
source ./util.sh

# 这样就可以调用 util 文件中的函数了
echo $(getName)
```

### tree

生成目录树结构, 通常用于描述项目结构。

```bash
# 递归当前目录下所有文件并生成目录树
tree

# -I 忽略某些目录
tree -I "node_modules"

# 只显示目录
tree -d

# 指定要递归的目录层级
tree -L 3
```

### ln

将某一个文件在另外一个位置建立并产生同步的链接。当不同的 2 个目录需要同时引用某一个文件时此命令就派上用场了。

> 这个命令的应用场景: 比如 yarn link

* 软链接也可以叫符号链接：
  * 软链接，以路径的形式存在。类似于 Windows 操作系统中的快捷方式;
  * 软链接可以 跨文件系统, 硬链接不可以;
  * 软链接可以对一个不存在的文件名进行链接;
  * 软链接可以对目录进行链接;
* 硬链接:
  * 硬链接，以文件副本的形式存在。但不占用实际空间, 从根本上而言就是同一个文件;
  * 不允许给目录创建硬链接;
  * 硬链接只有在同一个文件系统中才能创建;

> 理解: 文件系统博主理解: 比如在 mac 系统中装了个虚拟机, 虚拟机里面跑了另外一个 window 系统, 那此时 mac 和虚拟机里面的系统就是两个不同的文件系统。

```bash
# 默认创建硬链接，修改 README.md 内容， a.md 也会同步修改, 修改 a.md, README.md 也会同步修改
ln README.md a.md

# -s 创建软链接
ln -s README.md a.md # 如果删除了 README.md  a.md 将失效

# -f 强制执行
ln -f README.md ./src/a.md
```

### file

查看文件类型, 比如文件、目录、二进制、符号链接等。

```bash
file README.md
README.md: HTML document text, UTF-8 Unicode text
```

## 系统管理

### ping

测试目标地址是否可连接、延迟度

```bash
# 测试 github.com 连通性, 按 ctrl + C 停止
ping github.com

# ping 5 次后断开
ping -c 5 github.com

# 每 5 秒 ping 一次
ping -i 5 github.com
```

### which

查找某个命令存储在哪个位置, 输出绝对路径, which 会在环境变量 $PATH 设置的目录里去查找。

注: 可以通过 echo $PATH 查看设置的目录.

```bash
which top  # /usr/bin/top

# 打印多个命令
which ping top
```

### uptime

```bash
# 当前系统运行的天数，小时，分钟 (从上次开机起计算), 当前系统登录用户数。一分钟、5分钟、15分钟平均负载, 这 3 个值不能大于 CPU 个数，如果大于了说明系统负载高，性能低。
uptime # 13:25  up 2 days, 18:57, 7 users, load averages: 2.06 2.06 2.15
```

### uname

打印系统信息

```bash
# 不带任何参数打印当前操作系统内核名称
uname # Darwin , 等价于 uname -s

# 打印系统所有信息, cloud-2.local: 网络节点主机名称, x86_64: 主机的硬件架构名称
uname -a # Darwin cloud-2.local 19.4.0 Darwin Kernel Version 19.4.0: Wed Mar  4 22:28:40 PST 2020; root:xnu-6153.101.6~15/RELEASE_X86_64 x86_64

# 打印主机的硬件架构名称
uname -m # x86_64
```

### ifconfig

配置或显示系统网卡的网络参数。

```bash
# 显示所有网络参数信息
ifconfig
```

### lsof

列出当前系统打开文件的工具

```bash
## 打印所有打开文件的的列表
lsof

# 查看指定端口被占用情况
lsof -i:8080
```

### alias

设置命令别名，用于简化较长的命令。

```bash
# 列出所有已设置的别名
alias

# 删除所有别名
unalias -a

# 设置别名
alias ll='ls -l'
```

## 系统进程

### ps

ps 命令涵盖命令参数三大风格

* Unix 风格, `前面加单破折线`
* BSD 风格, 全称伯克利软件发行版(Berkeley software distribution), `前面不加破折线`
* GNU 风格, 全称 "Gnu's Not Unix", `前面加双破折线`

```bash
# 配合 grep 查询指定进程, -a means: all, -f means full
ps -af | grep nginx
```

## 其它

### clear

用于清除当前终端所有信息，本质上只是向后翻了一页，往上滚动还能看到之前的操作信息

> 注：效果等用于 `command + K` 可以完全清除终端所有操作信息。

```bash
clear
```

### link

* thanks for [Read Linux](https://github.com/xjh22222228/linux-manual).