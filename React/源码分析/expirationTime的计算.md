<!--
abbrlink: waiqiqhz
-->

### 计算公式

```js
const MAX_SIGNED_31_BIT_INT = Math.pow(2, 30) - 1

export const NoWork = 0;
export const Never = 1;

const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1;

// 1 unit of expiration time represents 10ms.
export function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}

export function expirationTimeToMs(expirationTime) {
  return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
}

function ceiling(num, precision) {
  return (((num / precision) | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return (
    MAGIC_NUMBER_OFFSET -
    ceiling(
      MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  );
}

export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;

export function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  );
}

export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

export function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  );
}
```

`computeAsyncExpiration` 函数化简后得到如下公式, 针对这个公式目前的心得如下:

1. 抹平传入的 `bucketSizeMs` 精度误差, 为 batch 作准备;
2. `currentTime` 越大, 相应的 `expirationTime` 的结果如下图所示;

![](http://with.muyunyun.cn/16a5237163f1e4f2967711442ec03a4c.jpg-200)

```js
const MAX_SIGNED_31_BIT_INT = Math.pow(2, 30) - 1
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1;

function ceiling(num, precision) {
  return (((num / precision) | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime) {
  return (
    MAGIC_NUMBER_OFFSET -
    ceiling(
      MAGIC_NUMBER_OFFSET - currentTime + 500,
      25,
    )
  );
}
```

`ceiling` 函数的作用: 根据 `precision` 的精度取值

```js
ceiling(25, 25) // 50
ceiling(26, 25) // 50
ceiling(27, 25) // 50
...
ceiling(49, 25) // 50
ceiling(50, 25) // 75
ceiling(51, 25) // 75
```
