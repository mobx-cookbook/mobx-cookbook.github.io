# Избавляемся от бойлерплейта в API-слое

При работе с API часто возникает необходимость описывать запросы к API, обрабатывать ошибки и состояния загрузки. В экосистеме Mobx нет аналога [react-query](https://github.com/TanStack/query), но базовый функционал можно построить с использованием официального пакета [mobx-utils](https://github.com/mobxjs/mobx-utils).

### Установка

`npm i mobx-utils`

### Использование

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

Теперь свойство `data` содержит `observable`-объект со свойствами `state` и `value`.
`state` принимает значения `'pending' | 'rejected' | 'fulfilled'`. `value` принимает значения `T | undefined`, где `T` - дженерик тип, который автоматически выводится TypeScript'ом на основе того, что передали в функцию `fromPromise`.

В компоненте можно по-разному отображать эти данные:

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

Либо через метод `case`:

```typescript jsx
const store = new TodoStore();

const TodoList = observer(() => {
  useEffect(() => {
    store.loadData();
  }, [])

  // Без этого ругается TS
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

Обратите внимание, что во всех примерах корректно работает вывод типов TypeScript для типа `Todo`. 

### Вывод
Библиотеки вроде `react-query` предоставляют много дополнительного функционала, например кеш и перезагрузку по фокусу. Но в простых сценариях `fromPromise` может сократить бойлерплейт. 