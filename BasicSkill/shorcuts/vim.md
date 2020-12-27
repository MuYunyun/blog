### vim 配置

#### 配置

* 步骤一. cp /usr/share/vim/vimrc ~/.vimrc
* 步骤二. vi ~/.vimrc

#### 可选配置

```js
set nocompatible               去掉有关 vi 一致性模式, 避免以前版本的bug和局限

set nu!                        显示行号

set guifont=Luxi/ Mono/ 9      设置字体, 字体名称和字号

filetype on                    检测文件的类型

set history=1000               记录历史的行数

set background=dark            背景使用黑色

syntax on                      语法高亮度显示

set autoindent                 vim 使用自动对齐, 也就是把当前行的对齐格式应用到下一行(自动缩进）

set cindent                   （cindent 是特别针对 C 语言语法自动缩进）

set smartindent                依据上面的对齐格式, 智能的选择对齐方式, 对于类似 C 语言编写上有用

set tabstop=4                  设置 tab 键为 4 个空格

set shiftwidth =4              设置当行之间交错时使用 4 个空格

set ai!                        设置自动缩进

set showmatch                  设置匹配模式, 类似当输入一个左括号时会匹配相应的右括号

set guioptions-=T              去除 vim 的 GUI 版本中得 toolbar

set vb t_vb=                   当 vim 进行编辑时, 如果命令错误, 会发出警报, 该设置去掉警报

set ruler                      在编辑过程中, 在右下角显示光标位置的状态行

set nohls                      默认情况下, 寻找匹配是高亮度显示, 该设置关闭高亮显示

set incsearch                  在程序中查询一单词, 自动匹配单词的位置；如查询 desk 单词, 当输到 /d 时, 会自动找到第一个 d 开头的单词, 当输入到 /de 时, 会自动找到第一个以 de 开头的单词, 以此类推, 进行查找; 当找到要匹配的单词时, 别忘记回车

set backspace=2                设置退格键可用
```

### vim 快捷键

```js
dd                             快速删除当前行
```