### Reading the HTML in the MDN

![](http://with.muyunyun.cn/6ffc01e7309a9456198b4c3336d23fda.jpg)

* Content categories;
* Permitted content;
* Tag omission: if the start or end tag can be omit;
* Permitted parents;
* Permitted ARIA roles;
* DOM interface;

### Content categories

![](http://with.muyunyun.cn/4bd17ab21f9619c48f08f3d6092d1db9.jpg-400)

### Question 1: What is the height of span?

```html
<span style="font-size: 16px; line-height: 1">hello</span>
```

From [Rules Between Block Elements And Inline Blocks](https://web.stanford.edu/class/cs193x/lectures/05/block-inline#height-and-width-of-inline-elements), we can learn that `you can't set any with/height/line-height css property to inline-element.` So the height of span is depende on the default browser.