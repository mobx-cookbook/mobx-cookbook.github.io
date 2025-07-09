# Reducing Boilerplate in the API Layer

When working with APIs, there's often a need to describe API requests, handle errors and loading states. The MobX ecosystem doesn't have an equivalent to [react-query](https://github.com/TanStack/query), but basic functionality can be built using the official [mobx-utils](https://github.com/mobxjs/mobx-utils) package.

### Installation

`npm i mobx-utils`

### Usage

```typescript
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

type Todo = {
  id: number;
  title: string;
}

const getTodos = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    { id: 1, title: 'Clean bathroom' },
    { id: 2, title: 'Feed the cat '},
  ]
}

class TodoStore {
  data?: IPromiseBasedObservable<Todo[]>

  constructor() {
    makeAutoObservable(this)
  }

  loadData() {
    this.data = fromPromise(getTodos())
  }
}
```

Now the `data` property contains an `observable` object with `state` and `value` properties.
`state` takes values `'pending' | 'rejected' | 'fulfilled'`. `value` takes values `T | undefined`, where `T` is a generic type that TypeScript automatically infers based on what was passed to the `fromPromise` function.

In the component, you can display this data in different ways:

```typescript jsx
const store = new TodoStore();

const TodoList = observer(() => {
  useEffect(() => {
    store.loadData();
  }, [])

  if (store.data?.state === 'pending') {
    return <div>Loading...</div>
  }

  if (store.data?.state === "rejected") {
    return <div>Error</div>
  }

  return <ul>
    {store.data?.value.map((todo, i) => {
      return <li key={i}>{todo.title}</li>
    })}
  </ul>
})
```

Or through the `case` method:

```typescript jsx
const store = new TodoStore();

const TodoList = observer(() => {
  useEffect(() => {
    store.loadData();
  }, [])

  // Without this TS complains
  if (!store.data) {
    return null;
  }

  return store.data.case({
    pending: () => <div>Loading...</div>,
    rejected: () => <div>Error</div>,
    fulfilled: (value) => <ul>
      {value.map((todo, i) => {
        return <li key={i}>{todo.title}</li>
      })}
    </ul>
  });
})
```

Note that in all examples, TypeScript's type inference for the `Todo` type works correctly.

### Conclusion
Libraries like `react-query` provide a lot of additional functionality, such as caching and refetching on focus. But in simple scenarios, `fromPromise` can reduce boilerplate.