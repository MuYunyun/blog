<!--
abbrlink: idu7szrn
-->

### Redux 的简易实现

```js
function createStore(reducer, initialState) {
  let state = initialState
  const eventList = []

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    eventList.map(r => r(state))
  }

  function subscribe(event) {
    eventList.push(event)
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}
```

测试用例

```js
const reducer = function(state, action) {
  switch (action.type) {
    case 'update':
      return action.payload
      break
    case 'update1':
      return {
        ...state,
        a: action.payload,
      }
      break
    default:
      return state
  }
}

const store = createStore(reducer, {a: 1, b: 2})

store.subscribe((state) => { console.log(state) })

store.dispatch({ type: 'update', payload: { a: 1, b: 2 }}) // { a: 1, b: 2 }
store.dispatch({ type: 'update1', payload: 3 }) // { a: 3, b: 2 }
console.log(store.getState()) // { a: 3, b: 2 }
```

### Redux 与 Mobx 适用场景

#### redux

* store - view - action 的闭环
* Redux 颗粒度更细, 相对更安全

#### mobx

* store - view 的闭环
* 使用了类双向绑定的思维