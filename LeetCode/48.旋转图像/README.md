### title

给定一个 n × n 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

说明:

你必须在原地旋转图像, 这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

示例 1:

```
给定 matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵, 使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

示例 2:

```
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
],

原地旋转输入矩阵, 使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

### analyze

这类题目可以采用如下思路:

1.matrix.reverse(), 得

```
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

2.然后以左上角到右下角的线作为翻转线进行翻转, 这里找规律

```
1 2 3
4 5 6  只需对  4   进行处理
7 8 9         7 8
```

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  matrix.reverse()

  let tmp
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < x; y++) {
      tmp = matrix[x][y]
      matrix[x][y] = matrix[y][x]
      matrix[y][x] = tmp
    }
  }

  console.log(matrix)
};
```