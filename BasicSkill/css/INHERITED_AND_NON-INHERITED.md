### INHERITED AND NON-INHERITED IN CSS

When I look up css properties in MDN's specifications section, there are `Initial value`、`Applies to`、`Inherited`、`Media`、`Computed value`、`Animation type`、`Canonical order` in it and it seems strange to me. So I want to find out some of them today.

![](http://with.muyunyun.cn/b22bcdb94d354d3f301cae7997d9cd17.jpg)

### Initial value between inherited and non-inherited

The initial value of a CSS property is its default value.

The Initial value has two different behavious between `inherited properties` and `non-inherited properties`.

For `inherited properties`, the initial value is `used on the root element only`.

```html
<span style="color: red">
  hello, <em>CSS</em>
</span>
```

The result is the color of both `span` and `em` element are red. Because the color is a inherited property, the element will get the color property from parent
recursively until to document.

For `non-inherited properties`, the initial value is `used on every element`. When no value for a non-inherited property has been specified on an element, the element gets the initial value directely.

```html
<span style="border: 1px solid black">
  hello, <em>CSS</em>
</span>
```

The result is the border is only effected on `span` element, not `em`. Because the border is a non-inherited property, and there is no border property specified on the em, so the em get the border's initial value `none`.

### Inherited Value && Non-Inherited Value

It mentioned much times about inherited value and non-inherited value above, and this section will sort out properties whitch are inherited value and whitch aren't.
