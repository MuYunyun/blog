### SearchBar

在使用 css 的动画属性 `transition` 时, 如果变化前后以下属性改变会使动画失效。`display/text-align`; 所以要维持动画的生效, 保留了 `text-align: center` 属性, 让搜索字样居中。如下图是动画前后的效果。

![](http://with.muyunyun.cn/cb02d781a8437bb43eea1581d41e6c87.jpg)

![](http://with.muyunyun.cn/004c6594536786fb1bb57e3df5524831.jpg)

受 `text-align: center` 影响, 为了不让 🔍 icon 居中, 这个时候使用 `visibility: hidden` 来占位;

![](http://with.muyunyun.cn/9366ca8f6e6f6d7c85d34ca893af131a.jpg)

### 几个事件钩子的调用先后顺序

* `onBlur`: 失焦
* `onClear`: 点击清除图标触发清除
* `onFocus`: 聚焦

![](http://with.muyunyun.cn/d188c846ffbd8c79646a940c352686d5.jpg)

点击 `x` 号, 因为 `x` 号不在 input 输入框内, 所以首先执行的是 `onBlur`, 然后期待调用 `onClear`, 最后再调用 `onFocus` 重新聚焦。