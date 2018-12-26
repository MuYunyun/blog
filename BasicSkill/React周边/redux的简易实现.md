### redux 的简易实现

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