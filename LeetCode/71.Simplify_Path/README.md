### 71.Simplify_Path

Given an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path.

In a UNIX-style file system, a period . refers to the current directory. Furthermore, a double period .. moves the directory up a level. For more information, see: Absolute path vs relative path in Linux/Unix

Note that the returned canonical path must always `begin with a slash /`, and there must be `only a single slash / between two directory names`. The last directory name (if it exists) must `not end with a trailing /`. Also, the canonical path must be the shortest string representing the absolute path.

Example 1:

Explanation: Note that there is no trailing slash after the last directory name.

```js
Input: "/home/"
Output: "/home"
```

Example 2:

Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.

```js
Input: "/../"
Output: "/"
```

Example 3:

Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.

```js
Input: "/home//foo/"
Output: "/home/foo"
```

Example 4:

```js
Input: "/a/./b/../../c/"
Output: "/c"
```

Example 5:

```js
Input: "/a/../../b/../c//.//"
Output: "/c"
```

Example 6:

```js
Input: "/a//b////c/d//././/.."
Output: "/a/b/c"
```

### Analyze

可以用栈的思想来完成解题;

1. 使用 '/' 分割 path 为得到数组;
2. 对以下几种情况分别处理:
   1. 如果遇见 '.' 或者 '', 则忽略;
   2. 如果遇见字母, 则将其推入栈的末尾;
   3. 如果遇见 '..', 则从栈末尾移除一个元素;

```js
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
  const pathArr = path.split('/')
  const stack = []
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i] === '..') {
      stack.pop()
    } else if (pathArr[i] === '.' || pathArr[i] === '') {
      continue
    } else {
      stack.push(pathArr[i])
    }
  }

  return `/${stack.join('/')}`
}
```

### Similar Title

20、150