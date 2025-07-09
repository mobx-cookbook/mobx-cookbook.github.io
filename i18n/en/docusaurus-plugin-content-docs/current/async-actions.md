# Asynchronous Actions

Asynchronous actions don't need any special handling in MobX, as all reactions are handled automatically regardless of where and when they occur. However, each step (`tick`) that updates observable fields inside an asynchronous process must be marked as an `action`. This can be achieved in several ways.

### Global Event Listener

Go to the index file `/src/index.tsx` and add the following code:

```js
import { spy } from 'mobx'

spy((ev) => {
  console.log(ev)
})
```

We imported the `spy` function from MobX and passed it a listener with `console.log`. `Spy` registers a global listener that logs all events happening inside MobX.

If you open the console, you'll see a lot of internal information about MobX's operation. To filter out the noise, let's keep only those events that contain the word `action` in their name:

```js
spy((ev) => {
  if (ev.type.includes('action')) {
    console.log(ev)
  }
})
```

Open the console and click on the `"+"` button:

```js
{type: "action", name: "inc", object: undefined, arguments: Array(1), spyReportStart: true} // 1

{name: "observer_c", type: "scheduled-reaction"} // 2

{name: "observer_c", type: "reaction", spyReportStart: true} // 3
```

We can see that after clicking, (1) an action named `inc` was called. Then (2) the reaction scheduler (`scheduled-reaction`) started, followed by the reaction itself (3). The reaction in this case is the rendering of our component. It has the strange name `observer_c` because our component is an anonymous function. Let's fix this in the `/src/App.tsx` file:

```typescript jsx
import { observer } from 'mobx-react-lite'
import { counterStore } from './counter.store'

export const App = observer(() => {
  const { count, inc, dec } = counterStore

  return (
    <div className='App'>
      <h1>{count}</h1>

      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  )
})

App.displayName = 'App'
```

Now we can see that the reaction occurred in the observer named `App`, i.e., in our component.

### Batching Updates

Let's go to the `/src/counter.store.ts` file and call increment `count` three times in the `inc` method:

```js
import { makeAutoObservable } from 'mobx'

class Store {
  count = 0
  
  constructor() {
    makeAutoObservable(this)
  }

  inc = () => {
    this.count++
    this.count++
    this.count++
  }

  dec = () => {
    this.count--
  }
}

export const counterStore = new Store()
```

If you open the console and click the `"+"` button, you'll see that the reaction ran only once, despite mutating `count` three times. Why? Because intermediate states are not visible to observers. MobX simply accumulates these changes and delays notifying subscribers until the transaction block is complete.

But this logic breaks when we add asynchronous actions to our action.

```typescript
import { makeAutoObservable } from 'mobx'

const delay = (ms: number) => new Promise((_) => setTimeout(_, ms))

class Store {
  count = 0
  
  constructor() {
    makeAutoObservable(this)
  }

  inc = async () => {
    await delay(10)
    this.count++
    this.count++
    this.count++
  }

  dec = () => {
    this.count--
  }
}

export const counterStore = new Store()
```

The `delay` function takes a number and returns a `Promise` that resolves after a `setTimeout`. Instead of `delay`, we could write an API request using `fetch` or any other asynchronous function, but a simple delay is sufficient for illustration.

Now if you open the console and click the `"+"` button, you'll see that an action is triggered (`{ type: "action", name: "inc" }`), followed by three reactions. One for each increment.

```
[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: Store@1.count

{name: "observerApp", type: "scheduled-reaction"}

{name: "observerApp", type: "reaction", spyReportStart: true}
```

MobX's update batching mechanism breaks because we've ["colored"](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) our asynchronous function. Once you launch asynchronous code from a synchronous execution point, you can't return to the call point from the asynchronous code. That is, any steps after await are not in the same tick.

### runInAction

To fix this behavior, you can use the `runInAction` function from the `mobx` package.

```js
inc = async () => {
  await delay(10)
  runInAction(() => {
    this.count++
    this.count++
    this.count++
  })
}
```

If we go back to the console, we'll see that the reaction scheduler and the reaction itself run only once.

The problem is solved, but wrapping code in `runInAction` every time can be tedious. There are several alternative solutions to this problem.

### setTimeout Reaction Scheduler

MobX allows you to configure the behavior of the reaction scheduler. By default, `reactionScheduler` simply runs the reaction `f` without any other behavior:

```js
import { configure } from 'mobx'

configure({
  reactionScheduler: (f) => {
    f()
  },
})
```

The `reactionScheduler` configuration can be useful for logging or debugging. Additionally, using `setTimeout` we can defer the execution of reactions:

```js
configure({
  enforceActions: 'never',
  reactionScheduler: (f) => {
    setTimeout(() => {
      f()
    }, 0)
  },
})
```

Equivalent code:

```js
configure({
  enforceActions: 'never',
  reactionScheduler: (f) => setTimeout(f),
})
```

This way, the scheduler will defer reactions until all your synchronous changes are complete. In other words, we accumulate changes, wait for them to complete, and then trigger reactions to these changes. This trick allows us to avoid using `runInAction` and using `flow` generators instead of async/await.

However, you need to understand that if some third-party code similarly defers tasks using `setTimeout` instead of executing them immediately, the processing order becomes unpredictable and hard-to-reproduce errors may occur. In particular, from the authors' experience, a deferred `reactionScheduler` breaks the `pusher-js` library and creates problems in the `React Native` environment.

The [official MobX position](https://github.com/mobxjs/mobx/discussions/2592#discussioncomment-121126) is not to use such tricks, but instead use `runInAction` or generators.

### Generators

Another way to avoid the problem is to use generators:

```js
import { makeAutoObservable } from 'mobx'

const delay = (ms: number) => new Promise((_) => setTimeout(_, ms))

class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  *inc() {
    yield delay(10)
    this.count++
    this.count++
    this.count++
  }

  dec() {
    this.count--
  }
}

export const counterStore = new Store()
```

This approach is the cleanest as it doesn't affect code nesting or the reaction scheduler. However, it has some typing complications. As a solution, you can use this helper function for MobX: https://github.com/mobxjs/mobx/discussions/3195#discussioncomment-2379437

You can vote for this feature on GitHub to have it added to the MobX core.

How to use generators with MobX will be described in a separate article.