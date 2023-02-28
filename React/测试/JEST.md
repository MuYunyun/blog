<!--
abbrlink: 42ftlsp4
-->

### 期望只测试测试文件中某个测试用例

```diff
describe('Modal Test', () => {

-  it('xxx', () => {
+  it.only('xxx', () => {

  })
})
```
