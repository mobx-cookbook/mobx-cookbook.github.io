# Actions

MobX doesn't require you to change observable fields inside actions. You can mutate state from anywhere in your application, although this is not recommended.

If you go back to the `/src/App.tsx` file, when clicking the `"+"` button you could skip calling the `inc` action and mutate the `count` field directly inside the component. Let's verify this works by assigning the value 10 on click:

```js
import { observer } from 'mobx-react-lite'
import { counterStore } from './counter.store'

export const App = observer(() => {
  return (
    <div className='App'>
      <h1>{counterStore.count}</h1>

      <button
        onClick={() => {
          counterStore.count = 10
        }}>
        +
      </button>
      <button onClick={counterStore.dec}>-</button>
    </div>
  )
})
```

The code works. Next, add the following code to the end of the `/src/counter.store.ts` file:

```js
setInterval(() => {
  counterStore.count++
}, 1000)
```

Here we increment `count` by one every second. Moreover, we could import `counterStore` in some other module and mutate it there as well.

At the same time, in our store the `double` computed value depends on the `count` field, and `double` could theoretically have several more reactions depending on it. Such cascading changes are not something you'd want to encounter in a real project.

If we open the console, we'll see that MobX displays a warning:
`[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: Store@1.count`

In strict mode (enabled by default in MobX 6), changing observable values without using actions is not allowed. We get this warning at runtime. To catch such errors at compile time, we could mark our field as private.

```typescript
class Store {
  constructor() {
    makeAutoObservable(this)
  }

  private _count = 0

  get count() {
    return this._count
  }

  inc = () => {
    this._count++
  }

  dec = () => {
    this._count--
  }

  get double() {
    return this._count * 2
  }
}
```

We added the TypeScript `private` modifier to the `_count` field, and to read this field from other functions, we created a `count` getter.

If we go back to the `/src/App.tsx` file, we'll see that TypeScript displays an error:
`Cannot assign to 'count' because it is a read-only property`

While creating a getter for each private field is a good practice, it can be tedious. Therefore, you can establish conventions within your team and, as an option, simply monitor this during code reviews.

### Why is it not recommended to change observable values outside of actions?
When an observable value changes from one place or method, its changes are easier to track, and the code becomes more predictable thanks to [encapsulation](https://learn.javascript.ru/private-protected-properties-methods).

### What happens if you ignore the strict mode warning?

Ignoring the warning about the need to wrap changes to observable values in actions won't affect runtime. The warning is just a signal that assignment is happening in an unexpected place, but the code will still work. You can verify this by reading the [source code](https://github.com/mobxjs/mobx/blob/2caf7e1a3504dde3d7c9bde3c6fb56ca85168018/packages/mobx/src/core/derivation.ts#L135) of MobX. The function can be simplified to:

```typescript
export function checkIfStateModificationsAreAllowed(atom: IAtom) {
  if (!__DEV__) {
    return
  }
  if (strictModeIsEnabled) {
    console.warn('Since strict-mode is enabled, changing...')
  }
}
```

Moreover, we can see that this code will only execute in development mode, and the bundler will remove it from the production build thanks to the condition with the `__DEV__` variable.