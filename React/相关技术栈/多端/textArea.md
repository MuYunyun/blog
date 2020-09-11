### 文档

比如 textArea 组件距离需要看两份文档。

1. [taro textArea](http://taro-docs.jd.com/taro/docs/components/forms/textarea.html)
2. [微信小程序文档 textArea](https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html)

### 关于 textArea 的坑点

1. 原生的组件永远的层级永远大于非原生组件的层级
2. [textArea 在 iphone 手机中存在内边距](https://segmentfault.com/a/1190000017086890)

目前一种方案是对 textArea 组件进行了相应封装, 展示的时候显示为自定义组件, 输入的时候使用原生 textArea.

`basicTextArea.js`

```js
import Taro, { Component } from '@tarojs/taro'
import { Textarea, View } from '@tarojs/components'
import cx from 'classnames'
import './index.scss'

interface BasicTextAreaProps {
  onChange: (...arg) => void
  onFocus: (...arg) => void
  onBlur: (...arg) => void
  placeholder?: string
  maxlength?: number
  value: string
  focus: boolean
}

const noop = () => {}

export default class BasicTextArea extends Component<BasicTextAreaProps, any> {
  static defaultProps: BasicTextAreaProps = {
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    placeholder: '',
    maxlength: -1,
    value: '',
    focus: false
  }

  handleInput = (...arg) => this.props.onChange(...arg)

  handleFocus = (...arg) => this.props.onFocus(...arg)

  handleBlur = (...arg) => this.props.onBlur(...arg)

  render() {
    const { platform } = Taro.getSystemInfoSync()
    const { value, focus, placeholder, maxlength } = this.props
    return (
      <View
        className={cx({
          textarea_ios: platform === 'ios',
          'textarea_android-placeholder': platform === 'android' && !value
        })}
      >
        <Textarea
          className={cx('textarea_text')}
          value={value}
          onInput={this.handleInput}
          focus={focus}
          onBlur={this.handleBlur}
          placeholder={placeholder}
          maxlength={maxlength}
        />
      </View>
    )
  }
}
```

`textArea.ts`, 切换相应组件的代码主要在这里进行处理。

```js
import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import cx from 'classnames'
import BasicTextArea from './basicTextArea'
import './index.scss'

interface TextAreaProps {
  placeholder?: string
  maxlength?: number
  onChange: (e: {detail: {value: string}}) => void
  value: string
}

export default class TextArea extends Component<TextAreaProps, any> {
  static defaultProps: Pick<TextAreaProps, 'placeholder' | 'maxlength'> = {
    placeholder: '',
    maxlength: -1,
  }

  state = {
    isFocus: false,
  }

  handleChange(e) {
    const { onChange } = this.props
    onChange(e)
  }

  // 处理原生 textArea 失焦/聚焦
  bindTextareaHandle(type: string) {
    if (type == 'blur') {
      this.setState({
        isFocus: false,
      })
    } else if (type == 'focus') {
      this.setState({
        isFocus: true,
      })
    }
  }

  render() {
    const { isFocus } = this.state
    const { placeholder, maxlength, value } = this.props
    const { platform } = Taro.getSystemInfoSync()
    return (
      <View>
        {this.state.isFocus ?
          <View className='textarea_content'>
            <BasicTextArea
              value={value}
              onChange={this.handleChange.bind(this)}
              focus={isFocus}
              onBlur={this.bindTextareaHandle.bind(this, 'blur')}
              maxlength={maxlength}
              placeholder={placeholder}
            />
          </View> :
          <View
            onClick={this.bindTextareaHandle.bind(this, 'focus')}
          >
            <ScrollView
              scrollY={true}
              className={'textarea_content'}
            >
              <Text className={cx('textarea_text', {
                'textarea_text-placeholder': !value,
                'textarea_text-ios': platform === 'ios',
              })}>{value ? value : placeholder}</Text>
            </ScrollView>
          </View>
        }
      </View>
    )
  }
}
```

`index.scss`

```css
.textarea_content {
  width: 100%;
  height: 192px;
  padding-top: 24px;
  padding-bottom: 24px;
  font-size: 32px;
  line-height: 48px;
  border-radius: 16px;
  background-color: #FFF;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.textarea_text {
  word-break: break-all;
  width: 100%;
  font-size: 32px;
  line-height: 48px;
  -webkit-appearance: none;
  height: 144px;
  overflow: scroll;

  &-placeholder {
    color: #999;
    /* 模拟光标占位 */
    padding-left: 2px;
  }

  &-ios {
    /* 尽可能模拟原生 textArea 的字间距 */
    letter-spacing: 0.1px;
  }
}

/*微信原生 textarea placeholder 颜色, 误删 */
.textarea-placeholder {
  color: #999;
  font-size: 32px;
}

/* 修复 ios 下有 padding 的问题 */
.textarea_ios {
  margin-top: -12px;
  margin-left: -8px;
}

/* 安卓手机上的 placeholder 会偏上, 但是目前这解法会有一个影响用户的动画 */
.textarea_android-placeholder {
  margin-top: 8px;
}
```