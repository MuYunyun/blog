### Picker 组件

#### 视觉兜底

在 Picker 组件中, 来聊聊组件视觉层面的兜底。

```js
<Picker
  title="选择时间"
  data={[
    [
      { label: '2014', value: '2014' },
      { label: '2015', value: '2015' },
      { label: '2016', value: '2016' },
      { label: '2017', value: '2017' },
      { label: '2018', value: '2018' },
      { label: '2019', value: '2019' }
    ]
  ]}
  value={['2013']}
>
  <ListItem placeholder="请选择" extraAlign="right" arrow="horizontal">
    选择时间
  </ListItem>
</Picker>
```

此时 value 的值并不在 data 数据源内, 此时页面的呈现状况如下

![](http://with.muyunyun.cn/cb71389f4a26685a686329d69290d15b.jpg)

讨论话题: 这样子的兜底对用户是否友好。

#### 一个典型的闭包陷阱

如下代码的逻辑是点击关闭按钮, 让值恢复到之前的值。一下代码有没有问题呢?

```js
close = () => {
  const { value, defaultPicker } = this.props
  setTimeout(() => {
    this.onChangePickerValue(value || defaultPicker || [])
  }, 1000)
}
```
