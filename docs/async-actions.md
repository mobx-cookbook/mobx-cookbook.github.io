# Асинхронные действия

Асинхронные действия не нуждаются в какой-либо специальной обработке в MobX, так как все реакции обрабатываются автоматически независимо от места и момента их возникновения. Однако каждый шаг (`tick`), который обновляет наблюдаемые поля внутри асинхронного процесса, должен быть помечен как `action`. Этого можно достичь несколькими способами.

### Слушатель всех событий

Перейдите в индексный файл `/src/index.tsx` и добавьте следующий код:

```js
import { spy } from 'mobx'

spy((ev) => {
  console.log(ev)
})
```

Мы импортировали из MobX функцию `spy` и передали в нее слушатель с `console.log`. `Spy` регистрирует глобальный слушатель, который логирует все события, происходящие внутри MobX.

Если вы откроете консоль, то увидите множество внутренней информации о работе MobX. Чтобы отфильтровать лишнее, давайте оставим только те события, которые в имени содержат слово `action`:

```js
spy((ev) => {
  if (ev.type.includes('action')) {
    console.log(ev)
  }
})
```

Откроем консоль и кликнем на кнопку `"+"`:

```js
{type: "action", name: "inc", object: undefined, arguments: Array(1), spyReportStart: true} // 1

{name: "observer_c", type: "scheduled-reaction"} // 2

{name: "observer_c", type: "reaction", spyReportStart: true} // 3
```

Мы видим, что после клика вызвался (1) экшн с именем `inc`. Потом запустился (2) планировщик реакций (`scheduled-reaction`), а потом и сама реакция (3). Реакцией в данном случае является рендеринг нашего компонента. У него странное имя `observer_c`, потому что наш компонент представляет собой анонимную функцию. Давайте это исправим в файле `/src/App.tsx`:

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

Теперь видим, что реакция произошла в наблюдателе (`observer`) с именем `App`, т.е. в нашем компоненте.

### Объединение обновлений

Давайте перейдем к файлу `/src/counter.store.ts` и в методе `inc` вызываем инкремент `count` трижды:

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

Если вы откроете консоль и нажмете на кнопку `"+"`, то увидите что реакция запустилась всего лишь один раз, несмотря на то, что мы трижды мутировали `count`. Почему? Потому что промежуточные состояния не видны наблюдателям. MobX просто копит эти изменения и откладывает уведомление подписчиков до завершения блока транзакции.

Но эта логика ломается если добавить асинхронные действия в наш экшн.

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

Функция `delay` принимает число и возвращает `Promise`, выполнение которого откладывается через `setTimeout`. Вместо `delay` мы могли бы написать запрос к API с помощью `fetch` или любую другую асинхронную функцию, но для иллюстрации достаточно простой задержки.

Теперь если открыть консоль и кликнуть на кнопку `"+"`, то мы увидим что запустился экшн (`{ type: "action", name: "inc" }`), а потом происходит три реакции. По одному на каждый инкремент.

```
[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: Store@1.count

{name: "observerApp", type: "scheduled-reaction"}

{name: "observerApp", type: "reaction", spyReportStart: true}
```

Механизм объединение обновлений MobX нарушается, потому что мы ["окрасили"](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) нашу асинхронную функцию. Запустив из какой-то точки синхронного выполнения асинхронный код — вы уже не сможете из асинхронного кода вернуться к точке вызова. То есть любые шаги после await не находятся в том же тике.

### runInAction

Чтобы исправить это поведение, можно использовать функцию `runInAction` из пакета `mobx`.

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

Если вернемся к консоли, то увидим что планировщик реакции и сама реакция запустятся один раз.

Проблема решена, но каждый раз оборачивать код в `runInAction` может быть утомительным. Есть несколько альтернативных решений этой проблемы.

### setTimeout планировщика реакций

MobX позволяет конфигурировать поведение планировщика реакций. По умолчанию `reactionScheduler` просто запускает реакцию `f` без какого-либо другого поведения:

```js
import { configure } from 'mobx'

configure({
  reactionScheduler: (f) => {
    f()
  },
})
```

Настройка `reactionScheduler` может быть полезна для логирования или отладки. Кроме того, с помощью `setTimeout` мы можем отложить выполнение реакций:

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

Эквивалентный код:

```js
configure({
  enforceActions: 'never',
  reactionScheduler: (f) => setTimeout(f),
})
```

Таким образом, планировщик будет откладывать реакции до тех пор, пока все ваши синхронные изменения не закончатся. То есть мы таким образом накапливаем изменения, ждем их завершения и потом вызываем реакции на эти изменения. Подобный трюк позволяет нам отказаться от `runInAction` и от использования `flow`-генераторов вместо async / await.

Вместе с тем нужно понимать, что если какой-то сторонний код аналогично откладывает задачи с помощью `setTimeout`, вместо того, чтобы выполнять их сразу, то порядок обработки становится непредсказуемым и могут возникать трудновоспроизводимые ошибки. В частности, из опыта авторов, отложенный `reactionScheduler` нарушает работу библиотеки `pusher-js` и создает проблемы в среде `React Native`.

[Официальная позиция Mobx](https://github.com/mobxjs/mobx/discussions/2592#discussioncomment-121126) - не использовать подобные трюки, а вместо этого использовать `runInAction` или генераторы.

### Генераторы

Другой способ избежать проблемы - использовать генераторы:

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

Этот подход является наиболее чистым, так как не влияет ни на вложенность кода, ни на планировщик реакций. Однако у него есть ряд сложностей с типизацией. Как решение можно использовать эту вспомогательную функцию для Mobx: https://github.com/mobxjs/mobx/discussions/3195#discussioncomment-2379437

Можете проголосовать за эту функцию на гитхабе, чтобы её добавили в ядро Mobx.

Как использовать генераторы с Mobx будет описано в отдельной статье.

