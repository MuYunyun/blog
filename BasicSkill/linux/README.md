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

# -i 查看inode编号, 每一个文件或目录都有一个唯一的编号，这个数字由内核分配给文件系统中的每一个对象
ls -i
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

* [to read](https://github.com/xjh22222228/linux-manual#mktemp)

### link

* thanks for [Read Linux](https://github.com/xjh22222228/linux-manual).