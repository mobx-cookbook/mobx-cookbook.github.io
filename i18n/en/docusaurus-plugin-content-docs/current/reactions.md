# Reactions

The next concept you need to understand is reactions. Add the following code to the end of `/src/counter.store.ts` file:

```js
export const counterStore = new Store()

autorun(() => {
  console.log(counterStore.count)
})
```

We created an instance of the `Store` class and added `autorun` as an example of a basic reaction. The function we pass to `autorun` will run every time the `count` value changes. Open the console to verify this.

Reactions are similar to `computed`, except that `computed` returns a new value, while reactions are side effects of state changes and don't return any new value. Console output, network requests, updating the React tree - these are all examples of reactions.

### Updating a React Component as an Example of a Reaction

Let's go to the `/src/App.tsx` file and write the following code:

```js
import { observer } from 'mobx-react-lite'
import { counterStore } from './counter.store'

export const App = observer(() => {
  return (
    <div className='App'>
      <h1>{counterStore.count}</h1>
      <h2>{counterStore.double}</h2>

      <button onClick={counterStore.inc}>+</button>
      <button onClick={counterStore.dec}>-</button>
    </div>
  )
})
```

We see a regular React component wrapped in the `observer` function from the `mobx-react-lite` package.

`observer` automatically subscribes the React component to any observable fields that are used during rendering. In this case, the component will subscribe to changes in `count` and `double` and will only re-render when they change.

Conceptually, `observer` is the same kind of reaction as `autorun`. Schematically, we could represent this reaction like this:

```js
autorun(() => this.render())
```

"Under the hood" the function works a bit more complexly, but this is enough for a general understanding.

### How Does It Work?

We didn't explicitly subscribe `autorun` or our React component `App` to changes in the `count` property. How does MobX understand which properties to subscribe to?

It doesn't. MobX doesn't subscribe to value changes, it tracks access to object properties.

When you read the `count` field inside `observer`, the `observer` itself remembers the fact that you used the `count` field in its function body. In other words, just reading the field is enough for `observer` (or any other reaction) to know that they depend on this field and need to watch it.

This often creates a feeling of "magic" in MobX. To demystify MobX, refer to the chapter [MobX in 50 Lines of Code](mobx-inside).