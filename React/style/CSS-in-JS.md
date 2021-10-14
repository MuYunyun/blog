<!--
abbrlink: nfp7pzds
-->

### style-components

#### 用法

```js
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
```

简版 style-components 的实现

```js
// When I call this function…
function h1(styles) {
  // …it generates a brand-new React component…
  return function NewComponent(props) {
    // …which will render the associated HTML element:
    return <h1 {...props} />
  }
}
```

#### 优点

* Lazy CSS Injection
  * 实现: 利用闭包


### link

* [https://www.joshwcomeau.com/react/demystifying-styled-components/](https://www.joshwcomeau.com/react/demystifying-styled-components/): 实现一个简版的 style-component